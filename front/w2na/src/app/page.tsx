'use client';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';

export default function Home() {
  const [textValue, setTextValue] = useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#65246F]">
      <div>
        <Textbox onChange={handleTextChange}></Textbox>
        <CreateVoiceButton textValue={textValue}></CreateVoiceButton>
      </div>
    </main>
  );
}

interface TextboxProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Textbox({ onChange }: TextboxProps) {
  return (
    <div>
      <input type="text" onChange={onChange} />
    </div>
  );
}

interface CreateVoiceButtonProps {
  textValue: string;
}

export function CreateVoiceButton({ textValue }: CreateVoiceButtonProps) {
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3001/request-handler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_text: textValue }),
      });
      if (response.ok) {
        // GETリクエスト成功時の処理
        console.log('データ取得成功');
        // 送信成功時の処理
        console.log('データ送信成功');
      } else {
        // エラーレスポンス時の処理
        console.log('データ取得失敗');
        console.log('データ送信失敗');
      }
    } catch (error) {
      // ネットワークエラー時の処理
      console.error('取得中にエラーが発生しました', error);
      console.error('送信中にエラーが発生しました', error);
    }
  };

  return (
    <div>
      <button
        className={'bg-[#FFD700] hover:opacity-75 w-64 h-8 rounded-lg'}
        onClick={handleSubmit}
      >
        CreateVoiceButton
      </button>
    </div>
  );
}
