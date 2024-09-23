// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/router';



// export default function SignInForm() {
//     const [password, setPassword] = useState('');
//     const router = useRouter();
  
//     const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
//       const response = await fetch('/api/auth', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ password }),
//       });
  
//       if (response.ok) {
//         router.push('/dashboard/master');
//       } else {
//         alert('Invalid password');
//       }
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter password"
//         />
//         <button type="submit">Sign In</button>
//       </form>
//     );
//   }