import { Button, Label, TextInput } from 'flowbite-react'
import { ChangeEvent, SyntheticEvent, useState } from 'react'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (res.status === 200) {
      const user = await res.json()
      console.log(user)
    } else {
      console.log(`${res.status} something went wrong`)
    }
    // alert(JSON.stringify(formData))
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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your name" />
          </div>
          <TextInput
            id="username"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required={true}
          />
        </div>
        <Button type="submit" style={{ backgroundColor: '#808080' }}>Register</Button>

      </form>
    </div>
  )
}

export default RegisterForm