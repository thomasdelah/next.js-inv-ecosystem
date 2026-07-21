'use client'

import { Button } from "@/lib/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/lib/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/lib/components/ui/field"
import { Input } from "@/lib/components/ui/input"
import { useTranslations } from "next-intl"
import useAuthViewModel from "./AuthViewModel"

export default function LoginForm() {
  const t = useTranslations('Login')
  const viewModel = useAuthViewModel()

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t('header')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={viewModel.handleSubmit(viewModel.onLogin)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">{t('formEmailInput')}</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder={t('formEmailPlaceholder')}
                {...viewModel.register('email', { required: true })}
              />
            </Field>
            <Field>
              <Button type="submit">{t('formSubmit')}</Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
