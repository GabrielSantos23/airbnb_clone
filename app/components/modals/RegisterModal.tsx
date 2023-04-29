'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';
const RegisterModal = () => {
  const RegisterModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      passwords: '',
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      // Após a criação da conta bem sucedida, fazemos o login automaticamente
      const signInRes = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      setIsLoading(false);

      if (signInRes?.ok) {
        toast.success('Account created and logged in');
        router.refresh();
        RegisterModal.onClose();
      } else if (signInRes?.error) {
        toast.error(signInRes.error);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Something went wrong');
      console.error(error);
    }
  };

  const toggle = useCallback(() => {
    RegisterModal.onClose();
    loginModal.onOpen();
  }, [loginModal, RegisterModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Airbnb' subtitle='Create an account' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='password'
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continue with GitHub'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex justify-center flex-row items-center gap-2'>
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={RegisterModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={RegisterModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
