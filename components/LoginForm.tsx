import { Button, Label, TextInput } from 'flowbite-react'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { signIn } from 'next-auth/react'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    })

    console.log('result', result)
  }

  return (
    <div className="w-60">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
          />
        </div>

        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}

export default LoginForm