import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import React from 'react'

export const MainPage: React.FC = () => {
  const onChange = (key: string) => key
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'First Service',
      children: <div>Hi</div>,
    },
    {
      key: '2',
      label: 'Second  Service',
      children: <div>Hello</div>,
    },
  ]
  return (
    <Tabs
      style={{ padding: 20 }}
      defaultActiveKey="1"
      items={ items }
      onChange={ onChange }
    />
  )
}
