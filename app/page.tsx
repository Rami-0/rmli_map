'use client';

import { useTranslations } from 'next-intl';
import CustomButton from '@/components/shared/custom-button';
import Container from '@/components/ui/container';

export default function Home() {
  const t = useTranslations('HomePage');
  async function handleClick() {
    fetch('http://localhost:3000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  return (
    <Container>
      <h1>{t('title')}</h1>
      <CustomButton>{t('button')}</CustomButton>
      <br />
      <br />
      <br />
      <br />
      <CustomButton onClick={handleClick}> test fetch </CustomButton>
    </Container>
  );
}
