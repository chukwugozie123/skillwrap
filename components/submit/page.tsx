'use client'
   
   export default async function FormSubmit(prevState: any, formData: FormData) {
    const res = await fetch('http://localhost:5000/auth/login', {
      method: 'post',
      body: formData
    })  

    const data = await res.json()
      return data
   }