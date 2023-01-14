import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Row } from 'antd';
import './loginForm.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth';
import login from '../../service';
const LoginForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        if (name && password) {
            if (await login({ username: name, password })) {
                console.log(login({ username: name, password }))
                auth.login({ username: name, password });
                navigate('/profile', { replace: true });
            }
            else {
                navigate('/login')
            }

        }
        else {
            navigate('/login')
        }

    }
    const onFinish = (values) => {
        console.log('Success:', values.username, values.password);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                onClick={handleLogin}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='form-container'

            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 8 }}>
                    <Row justify="start">
                        <Checkbox>Remember me</Checkbox>
                    </Row>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                    <Row justify="start">
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Row>
                </Form.Item>
            </Form>

        </>
    );
};
export default LoginForm;
