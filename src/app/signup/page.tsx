"use client";
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import prisma from '@/lib/prisma';

export default function Register() {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    username: '',
    name:'',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const resp = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    });

      if (resp.ok) {
        // Data is successfully added to the database
        const data = await resp.json();
        console.log('User registered:', data);

        // Redirect or navigate to another page
        router.push("/"); // Redirect to another page if needed
      } else {
        // Handle error
        router.back(); // Go back to previous page if registration fails
      }
    };

  return (
    <>
      <h1>ลงทะเบียน</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input
            required
            type="email"
            name="username"
            value={formValue.username}
            onChange={handleChange}
            placeholder="Email address"
            className="form-control"
          />
          </div>
          
        </div>
        <div className="mb-3">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
          <input
            required
            type="name"
            name="name"
            value={formValue.name}
            onChange={handleChange}
            placeholder="Name"
            className="form-control"
          />
          </div>
        </div>
        <div className="mb-3">
        <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
          <input
            required
            type="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-control"
          />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </>
  );
}