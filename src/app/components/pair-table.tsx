"use client"
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { addPair, removePair, setPairs } from "@/lib/slices/pairsSlice";
import { Input, Button, Table, Space, Popconfirm, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function PairTable() {
  const pairs = useSelector((state: RootState) => state.pairs.items);
  const dispatch = useDispatch();

  // State for the new pair form
  const [newPair, setNewPair] = useState({
    name: "",
    rate: "",
  });

  const [editPair, setEditPair] = useState<Pair | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPair((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPair.name && newPair.rate) {
      // Dispatch the addPair action
      dispatch(
        addPair({
          id: new Date().toISOString(), // Generate a unique ID for the new pair
          name: newPair.name,
          rate: parseFloat(newPair.rate), // Ensure the rate is a number
        })
      );
      // Clear the form after submission
      setNewPair({ name: "", rate: "" });
    }
  };

  const handleDelete = (id: string) => {
    dispatch(removePair(id));
  };

  const handleEdit = (pair: Pair) => {
    setEditPair(pair);
    setNewPair({ name: pair.name, rate: pair.rate.toString() });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editPair && newPair.name && newPair.rate) {
      dispatch(
        setPairs(
          pairs.map((pair) =>
            pair.id === editPair.id
              ? { ...pair, name: newPair.name, rate: parseFloat(newPair.rate) }
              : pair
          )
        )
      );
      setNewPair({ name: "", rate: "" });
      setEditPair(null);
    }
  };

  const columns = [
    {
      title: "Пара",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Курс",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: Pair) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="link"
          >
            Редактировать
          </Button>
          <Popconfirm
            title="Вы уверены, что хотите удалить эту пару?"
            onConfirm={() => handleDelete(record.id)}
            okText="Да"
            cancelText="Нет"
          >
            <Button
              icon={<DeleteOutlined />}
              type="link"
              danger
            >
              Удалить
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Add Pair Form */}
      <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Добавить или изменить пару</h2>
        <Form
          onSubmitCapture={editPair ? handleUpdate : handleSubmit}
          layout="vertical"
        >
          <Form.Item label="Название пары" required>
            <Input
              name="name"
              value={newPair.name}
              onChange={handleInputChange}
              placeholder="Название пары"
            />
          </Form.Item>
          <Form.Item label="Курс" required>
            <Input
              type="number"
              name="rate"
              value={newPair.rate}
              onChange={handleInputChange}
              placeholder="Курс"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
          >
            {editPair ? "Обновить пару" : "Добавить пару"}
          </Button>
        </Form>
      </div>

      {/* Pairs Table */}
      <div className="mt-8">
        <Table
          columns={columns}
          dataSource={pairs}
          rowKey="id"
          pagination={false}
        />
      </div>
    </div>
  );
}
