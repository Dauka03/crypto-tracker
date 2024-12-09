import React from 'react';
import { Button, Space } from 'antd';

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Криптовалютные курсы</h1>
      <p>Выберите пару для просмотра аналитики.</p>
      <div className="mt-4">
        <Space>
          <Button
            type="primary"
            href="/pairs"
            size="large"
          >
            Перейти к курсам
          </Button>
          <Button
            type="default"
            href="/analytics"
            size="large"
            className="ml-4"
          >
            Перейти к аналитике
          </Button>
        </Space>
      </div>
    </div>
  );
}
