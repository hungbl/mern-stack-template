import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import {
    registerSelector, changeUsername, changeEmail,
    changePassword, changeConfirmPassword, validatedInput, createUser
} from '../slices/register'
import { authSelector } from '../slices/auth'

const Register = () => {
    const dispatch = useDispatch()
    const { email, name, password, confirmPassword, validated, hasErrors, messages } = useSelector(registerSelector)
    const { authenticated } = useSelector(authSelector)
    const handleSubmit = (e) => {
        const form = e.currentTarget
        e.preventDefault()
        e.stopPropagation()
        if (!form.checkValidity()) {
            dispatch(validatedInput())
            return
        }

        dispatch(createUser({ name, email, password }))
    }

    if (authenticated) {
        return <Redirect to="/" />
    }

    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>Register to start predict now!</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="abc@gmail.com" required
                                value={email} onChange={(e) => dispatch(changeEmail(e.target.value))}></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="letgogreen" required
                                value={name} onChange={(e) => dispatch(changeUsername(e.target.value))}></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide a name</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="********" required
                                value={password} onChange={(e) => dispatch(changePassword(e.target.value))}></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide a password</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="********" required isInvalid={password !== confirmPassword}
                                value={confirmPassword} onChange={(e) => dispatch(changeConfirmPassword(e.target.value))}></Form.Control>
                            <Form.Control.Feedback type="invalid">Confirm password must match password</Form.Control.Feedback>
                        </Form.Group>
                        {
                            hasErrors && messages.length > 0 && messages.map(m => (
                                <Alert key={m.message} variant="danger">{m.message}</Alert>
                            ))
                        }
                        <Button variant="primary" type="submit">Register</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register