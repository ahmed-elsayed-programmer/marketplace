"use client"
import { Icons } from '@/components/Icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import api from '@/lib/api'


const Page = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get('as') === 'seller';
  const origin = searchParams.get('origin');

  const AuthCredentialsValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Passowrd must be at least 8 characters long.' })
  })
  type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>

  const { register, handleSubmit, formState: { errors } } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator)

  });


  const onSubmit = async ({ email, password }: TAuthCredentialsValidator) => {
    // send data to the server 
    try {
      const rest = await api.post("/token/", {
        email, password
      })
      localStorage.setItem('access', rest.data.access)
      localStorage.setItem('refresh', rest.data.refresh);
      router.push('/')

    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <div className='container relative flex pt-20 flex-col justify-center items-center lg:px-0'>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className='h-20 w-20' />
          <h1 className='text-2xl font-bold'>
            Sign in to your account
          </h1>

          <Link
            href='/sign-up'
            className={buttonVariants({
              variant: 'link',
              className: 'gap-1.5'
            })}>
            Dont&apos;t have an account?
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor='email'>Email</Label>
                <Input
                  {...register('email')}
                  className={cn({
                    "focus-visible:ring-red-500": errors.email
                  })}
                  placeholder='you@example.com'
                />
              </div>
              <div className="grid gap-1 py-2">
                <Label htmlFor='password'>Password</Label>
                <Input
                  {...register('password')}
                  className={cn({
                    "focus-visible:ring-red-500": errors.password
                  })}
                  placeholder='password'
                />
              </div>
              <Button>Login</Button>
            </div>
          </form>

          <div className='relative'>
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className='bg-background px-2 text-muted-foreground'>
                or
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page