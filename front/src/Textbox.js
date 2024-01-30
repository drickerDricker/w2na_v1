import React, { useState } from 'react';

function MyTextBox() {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    const validateInput = (input) => {
        // ひらがなのみを許可し、15文字以下であることを確認
        return /^[ぁ-ん]{0,15}$/.test(input);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = async () => {
        if (!validateInput(value)) {
            setIsValid(false);
            return;
        }

        setIsValid(true);

        try {
            const response = await fetch('http://127.0.0.1:3001/request-handler', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: value }),
            });
            if (response.ok) {
                // 送信成功時の処理
                console.log('データ送信成功');
            } else {
                // エラーレスポンス時の処理
                console.log('データ送信失敗');
            }
        } catch (error) {
            // ネットワークエラー時の処理
            console.error('送信中にエラーが発生しました', error);
        }
    };

    return (
        <div>
            <input type="text" value={value} onChange={handleChange} />
            <button onClick={handleSubmit}>送信</button>
            {!isValid && <p style={{color: 'red'}}>入力はひらがな15文字以下にしてください</p>}
        </div>
    );
}

export default MyTextBox;