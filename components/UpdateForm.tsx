import { Button, Label, TextInput } from 'flowbite-react'
import { ChangeEvent, FC, SyntheticEvent, useState } from 'react'

interface UserData {
  id: number
  email: string
  name: string | null
}

interface Props {
  user: UserData
}

const UpdateForm: FC<Props> = ({ user }) => {
  const [formData, setFormData] = useState({
    email: user.email,
    name: user.name,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
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
            <Label htmlFor="username" value="Your name" />
          </div>
          <TextInput
            id="username"
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required={true}
          />
        </div>
        <Button type="submit">Update User</Button>
      </form>
    </div>
  )
}

export default UpdateForm