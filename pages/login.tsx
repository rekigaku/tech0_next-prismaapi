import Layout from '../components/Layout'
import RegisterForm from '../components/RegisterForm'

export default function LoginPage() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl font-black font-sans p-4 mt-6">Login Form</h2>
        <RegisterForm />
      </div>
    </Layout>
  )
}