import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import { loginSelector, changeEmail, changePassword, validateInput, logUserIn } from '../slices/login'
import { authSelector } from '../slices/auth'

const Login = () => {
    const dispatch = useDispatch()
    const { authenticated } = useSelector(authSelector)
    const { email, password, validated, hasErrors, messages } = useSelector(loginSelector)

    const handleSubmit = (e) => {
        const form = e.currentTarget
        e.preventDefault()
        e.stopPropagation()
        if (!form.checkValidity()) {
            dispatch(validateInput())
            return
        }

        dispatch(logUserIn({ email, password }))
    }

    if (authenticated) {
        return <Redirect to='/' />
    }

    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <h1>Login to start predict now!</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" required
                                value={email} onChange={(e) => dispatch(changeEmail(e.target.value))}></Form.Control>
                            <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="******" required
                                value={password} onChange={(e) => dispatch(changePassword(e.target.value))}></Form.Control>
                            <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    {
                        hasErrors && messages.length > 0 && messages.map(m => (
                            <Alert key={m.message} variant="danger">{m.message}</Alert>
                        ))
                    }
                    <Button variant="primary" type="submit">Login</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Login