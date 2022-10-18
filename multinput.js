import React, { useState, useCallback } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { Layout } from 'antd';

const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const { Content } = Layout;

export function InputFilter() {

    const [cpfOn, setCpfOn] = useState(false)
    const [cnpjOn, setCnpjOn] = useState(false)
    const [telefoneOn, setTelefoneOn] = useState(false)
    const [emailOn, setEmailOn] = useState(false)
    const [tipo, setTipo] = useState("text")
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [form] = Form.useForm();

    const onGenderChange = (value) => {
        switch (value) {
            case 'Email':
                setTipo("email")
                setEmailOn(!emailOn)
                if (cpfOn === true) {
                    setCpfOn(false)
                } else if (cnpjOn === true) {
                    setCnpjOn(false)
                }
                else {
                    setTelefoneOn(false)
                }
                return;

            case 'CNPJ':
                setTipo("text")
                setCnpjOn(!cnpjOn)
                if (cpfOn === true) {
                    setCpfOn(false)
                }
                else if (emailOn === true) {
                    setEmailOn(false)
                }
                else {
                    setTelefoneOn(false)
                }
                return;

            case 'Telefone':
                setTipo("text")
                setTelefoneOn(!telefoneOn)
                if (cnpjOn === true) {
                    setCnpjOn(false)
                }
                else if (emailOn === true) {
                    setEmailOn(false)
                }
                else {
                    setCpfOn(false)
                }
                return;

            case 'CPF':
                setTipo("text")
                setCpfOn(!cpfOn)
                if (cnpjOn === true) {
                    setCnpjOn(false)
                }
                else if (emailOn === true) {
                    setEmailOn(false)
                }
                else {
                    setTelefoneOn(false)
                }

                return;

            default:
        };
    }

    function verificarCPF(strCpf) {
        if (!/[0-9]{11}/.test(strCpf)) return false;
        if (strCpf === "00000000000") return false;

        var soma = 0;

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(strCpf.substring(i - 1, i)) * (11 - i);
        }

        var resto = soma % 11;

        if (resto === 10 || resto === 11 || resto < 2) {
            resto = 0;
        } else {
            resto = 11 - resto;
        }

        if (resto !== parseInt(strCpf.substring(9, 10))) {
            return false;
        }

        soma = 0;

        for (var i = 1; i <= 10; i++) {
            soma += parseInt(strCpf.substring(i - 1, i)) * (12 - i);
        }
        resto = soma % 11;

        if (resto === 10 || resto === 11 || resto < 2) {
            resto = 0;
        } else {
            resto = 11 - resto;
        }

        if (resto !== parseInt(strCpf.substring(10, 11))) {
            return false;
        }

        return true;
    }

    const handleKeyUpCpf = useCallback((e) => {
        e.currentTarget.maxLength = 11;
        let value = e.currentTarget.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        e.currentTarget.value = value;
    }, [])


    const handleKeyUpCnpj = useCallback((e) => {
        e.currentTarget.maxLength = 14;
        let value = e.currentTarget.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
        e.currentTarget.value = value;
    }, [])

    const handleKeyUpTel = useCallback((e) => {
        let value = e.currentTarget.value;
        value = value.replace(/^(\d{0})(\d{2})(\d{5})(\d{4})/, "$1($2) $3.$4")
        e.currentTarget.value = value;
    }, [])

    const onFinish = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };



    return (
        <>
            <Form {...layout} form={form} name="control-hooks">

                <Form.Item
                    name="gender"
                    label="Tipo de Dado"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Selecione a opção de Login"
                        onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="Email">Email</Option>
                        <Option value="CNPJ">CNPJ</Option>
                        <Option value="Telefone">Telefone</Option>
                        <Option value="CPF">CPF</Option>
                    </Select>
                </Form.Item>

                <Input type={tipo} value={cpf} onKeyUp={handleKeyUpCpf} placeholder="999-999-999-99"
                    onChange={(event) => setCpf(event.target.value)} className={`input ${cpfOn === true && 'active'}`} />

                <Input type={tipo} value={cnpj} onKeyUp={handleKeyUpCnpj} placeholder="99-999-999/9999-99"
                    onChange={(event) => setCnpj(event.target.value)} className={`input ${cnpjOn === true && 'active'}`} />

                <Input type={tipo} value={tel} onKeyUp={handleKeyUpTel} placeholder="(99) 99999-9999"
                    onChange={(event) => setTel(event.target.value)} className={`input ${telefoneOn === true && 'active'}`} />

                <Input type={tipo} value={email} placeholder="example@gmail.com"
                    onChange={(event) => setEmail(event.target.value)} className={`input ${emailOn === true && 'active'}`} />


                <a className="login-form-forgot" href="">
                    Esqueceu sua senha? Relaxa.
                </a>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Enviar
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Redefinir
                    </Button>
                </Form.Item>
            </Form>
        </>
    )

}
