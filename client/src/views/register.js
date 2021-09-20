import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { registerSelector, changeUsername, changeEmail, changePassword, changeConfirmPassword } from '../slices/register'

const Register = () => {
    const dispatch = useDispatch()
    const { email, username, password, confirmPassword } = useSelector(registerSelector)
    return (
        <Container fluid>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                                value={email} onChange={(e) => dispatch(changeEmail(e.target.value))}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"
                                value={username} onChange={(e) => dispatch(changeUsername(e.target.value))}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"
                                value={password} onChange={(e) => dispatch(changePassword(e.target.value))}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password"
                                value={confirmPassword} onChange={(e) => dispatch(changeConfirmPassword(e.target.value))}></Form.Control>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Register