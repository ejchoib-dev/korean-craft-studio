'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { classes } from '@/lib/mock-data';
import { submitClassApplication } from '@/lib/mock-api';
import type { ClassApplicationFormData, WorkshopClass } from '@/types';
import FormMessage from '@/components/common/FormMessage';

type Status = 'idle' | 'loading' | 'success' | 'error';
type FieldName = 'name' | 'phone' | 'classId' | 'participantCount';
type FieldErrors = Partial<Record<FieldName, string>>;

const fieldIds: Record<FieldName, string> = {
  name: 'name',
  phone: 'phone',
  classId: 'classId',
  participantCount: 'participantCount',
};

const validate = (data: ClassApplicationFormData): FieldErrors => {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = '이름을 입력해주세요.';
  if (!data.phone.trim()) errors.phone = '전화번호를 입력해주세요.';
  if (!data.classId) errors.classId = '클래스를 선택해주세요.';
  if (!Number.isInteger(data.participantCount) || data.participantCount < 1)
    errors.participantCount = '참여 인원은 1명 이상이어야 합니다.';
  return errors;
};

interface ClassApplicationFormProps {
  selectedClass?: WorkshopClass;
  onSuccess?: (receptionNumber: string) => void;
  onClose?: () => void;
}

const inputClass =
  'w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-base text-stone-900 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-300 disabled:bg-stone-100';

export default function ClassApplicationForm({
  selectedClass,
  onSuccess,
  onClose,
}: ClassApplicationFormProps) {
  const [formData, setFormData] = useState<ClassApplicationFormData>({
    name: '',
    phone: '',
    classId: selectedClass?.id ?? '',
    participantCount: 1,
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [receptionNumber, setReceptionNumber] = useState('');

  const isLoading = status === 'loading';

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'participantCount' ? Number(value) : value,
    }));
    if (name in fieldIds) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const errors = validate(formData);
    setFieldErrors(errors);
    const firstInvalid = (Object.keys(fieldIds) as FieldName[]).find((f) => errors[f]);
    if (firstInvalid) {
      setStatus('idle');
      setError('');
      document.getElementById(fieldIds[firstInvalid])?.focus();
      return;
    }

    setStatus('loading');
    setError('');

    try {
      // submitClassApplication includes the 700ms mock delay
      const res = await submitClassApplication(formData);
      const number = res.data?.receptionNumber;
      if (res.success && number) {
        setReceptionNumber(number);
        setStatus('success');
        onSuccess?.(number);
      } else {
        setError(res.error ?? '신청 중 오류가 발생했습니다');
        setStatus('error');
      }
    } catch {
      setError('신청 중 오류가 발생했습니다');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4" aria-label="클래스 신청 폼">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-xl font-bold text-stone-900">클래스 신청</h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="rounded-lg p-2 text-2xl leading-none text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
          >
            ×
          </button>
        )}
      </div>

      <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
        이 폼은 실습용입니다. 실제로 신청이 접수되지 않습니다.
      </p>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-stone-700">
          이름 <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-required="true"
          aria-invalid={fieldErrors.name ? "true" : "false"}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className={inputClass}
        />
        {fieldErrors.name && (
          <span id="name-error" role="alert" className="text-xs text-red-700">
            {fieldErrors.name}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm font-medium text-stone-700">
          전화번호 <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          aria-required="true"
          aria-invalid={fieldErrors.phone ? "true" : "false"}
          aria-describedby={fieldErrors.phone ? "phone-hint phone-error" : "phone-hint"}
          placeholder="010-1234-5678"
          value={formData.phone}
          onChange={handleChange}
          disabled={isLoading}
          className={inputClass}
        />
        <span id="phone-hint" className="text-xs text-stone-500">예: 010-1234-5678</span>
        {fieldErrors.phone && (
          <span id="phone-error" role="alert" className="text-xs text-red-700">
            {fieldErrors.phone}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="classId" className="text-sm font-medium text-stone-700">
          클래스 선택 <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <select
          id="classId"
          name="classId"
          required
          aria-required="true"
          aria-invalid={fieldErrors.classId ? "true" : "false"}
          aria-describedby={fieldErrors.classId ? "classId-error" : undefined}
          value={formData.classId}
          onChange={handleChange}
          disabled={isLoading}
          className={inputClass}
        >
          <option value="">클래스를 선택해주세요</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.price.toLocaleString('ko-KR')}원)
            </option>
          ))}
        </select>
        {fieldErrors.classId && (
          <span id="classId-error" role="alert" className="text-xs text-red-700">
            {fieldErrors.classId}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="participantCount" className="text-sm font-medium text-stone-700">
          참여 인원 <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <input
          id="participantCount"
          name="participantCount"
          type="number"
          required
          aria-required="true"
          aria-invalid={fieldErrors.participantCount ? "true" : "false"}
          aria-describedby={fieldErrors.participantCount ? "participantCount-error" : undefined}
          min={1}
          value={formData.participantCount}
          onChange={handleChange}
          disabled={isLoading}
          className={inputClass}
        />
        {fieldErrors.participantCount && (
          <span id="participantCount-error" role="alert" className="text-xs text-red-700">
            {fieldErrors.participantCount}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-stone-700">
          추가 요청사항
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          disabled={isLoading}
          className={inputClass}
        />
      </div>

      {status === 'loading' && <FormMessage status="loading" message="" />}
      {status === 'success' && (
        <FormMessage
          status="success"
          message="클래스 신청이 접수되었습니다"
          receptionNumber={receptionNumber}
        />
      )}
      {status === 'error' && (
        <FormMessage status="error" message={error} onRetry={() => setStatus('idle')} />
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-stone-400 disabled:to-stone-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:shadow-none disabled:cursor-not-allowed hover:scale-105 disabled:scale-100 text-sm sm:text-base"
      >
        {isLoading ? '신청 중...' : '신청하기'}
      </button>
    </form>
  );
}
