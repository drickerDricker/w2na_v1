import React, { useState } from 'react';

function MyTextBox() {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = async () => {
        const url = `https://localhost:8000/hello`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                // GETリクエスト成功時の処理
                console.log('データ取得成功');
            } else {
                // エラーレスポンス時の処理
                console.log('データ取得失敗');
            }
        } catch (error) {
            // ネットワークエラー時の処理
            console.error('取得中にエラーが発生しました', error);
        }
    };

    return (
        <div>
            <input type="text" value={value} onChange={handleChange} />
            <button onClick={handleSubmit}>送信</button>
        </div>
    );
}

export default MyTextBox;