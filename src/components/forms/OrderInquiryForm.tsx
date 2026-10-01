'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Craft, OrderInquiryFormData } from '@/types';
import { crafts } from '@/lib/mock-data';
import { submitOrderInquiry } from '@/lib/mock-api';
import FormMessage from '@/components/common/FormMessage';

interface OrderInquiryFormProps {
  selectedCraft?: Craft;
  onSuccess?: (receptionNumber: string) => void;
  onClose?: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';
type FieldName = 'name' | 'phone' | 'craftId';
type FieldErrors = Partial<Record<FieldName, string>>;

const fieldIds: Record<FieldName, string> = {
  name: 'order-name',
  phone: 'order-phone',
  craftId: 'order-craft',
};

const validate = (data: OrderInquiryFormData): FieldErrors => {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = '이름을 입력해주세요.';
  if (!data.phone.trim()) errors.phone = '전화번호를 입력해주세요.';
  if (!data.craftId) errors.craftId = '상품을 선택해주세요.';
  return errors;
};

const inputClass =
  'w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 disabled:bg-stone-100';

export default function OrderInquiryForm({
  selectedCraft,
  onSuccess,
  onClose,
}: OrderInquiryFormProps) {
  const [formData, setFormData] = useState<OrderInquiryFormData>({
    name: '',
    phone: '',
    craftId: selectedCraft?.id ?? '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [receptionNumber, setReceptionNumber] = useState('');

  const isLoading = status === 'loading';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      // submitOrderInquiry 내부에서 700ms 지연 처리됨
      const res = await submitOrderInquiry(formData);
      if (res.success && res.data) {
        setReceptionNumber(res.data.receptionNumber);
        setStatus('success');
        onSuccess?.(res.data.receptionNumber);
      } else {
        setError(res.error ?? '문의 접수에 실패했습니다. 다시 시도해주세요.');
        setStatus('error');
      }
    } catch {
      setError('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4" aria-label="주문 문의 폼">
      <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
        실습용 안내: 이 폼은 실제로 전송되지 않는 예시입니다. 전화번호에 010-0000-0000을 입력하면 오류
        상태를 확인할 수 있습니다.
      </p>

      <div className="flex flex-col gap-1">
        <label htmlFor="order-name" className="text-sm font-medium text-stone-800">
          이름 <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <input
          id="order-name"
          name="name"
          type="text"
          required
          aria-required="true"
          aria-invalid={fieldErrors.name ? "true" : "false"}
          aria-describedby={fieldErrors.name ? "order-name-error" : undefined}
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className={inputClass}
        />
        {fieldErrors.name && (
          <span id="order-name-error" role="alert" className="text-xs text-red-700">
            {fieldErrors.name}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="order-phone" className="text-sm font-medium text-stone-800">
          전화번호 <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <input
          id="order-phone"
          name="phone"
          type="tel"
          required
          aria-required="true"
          aria-invalid={fieldErrors.phone ? "true" : "false"}
          aria-describedby={fieldErrors.phone ? "order-phone-hint order-phone-error" : "order-phone-hint"}
          placeholder="010-1234-5678"
          value={formData.phone}
          onChange={handleChange}
          disabled={isLoading}
          className={inputClass}
        />
        <span id="order-phone-hint" className="text-xs text-stone-500">예: 010-1234-5678</span>
        {fieldErrors.phone && (
          <span id="order-phone-error" role="alert" className="text-xs text-red-700">
            {fieldErrors.phone}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="order-craft" className="text-sm font-medium text-stone-800">
          상품선택 <span aria-hidden="true" className="text-red-600">*</span>
        </label>
        <select
          id="order-craft"
          name="craftId"
          required
          aria-required="true"
          aria-invalid={fieldErrors.craftId ? "true" : "false"}
          aria-describedby={fieldErrors.craftId ? "order-craft-error" : undefined}
          value={formData.craftId}
          onChange={handleChange}
          disabled={isLoading}
          className={inputClass}
        >
          <option value="">상품을 선택하세요</option>
          {crafts.map((craft) => (
            <option key={craft.id} value={craft.id}>
              {craft.name} ({craft.price.toLocaleString('ko-KR')}원)
            </option>
          ))}
        </select>
        {fieldErrors.craftId && (
          <span id="order-craft-error" role="alert" className="text-xs text-red-700">
            {fieldErrors.craftId}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="order-message" className="text-sm font-medium text-stone-800">
          추가요청사항
        </label>
        <textarea
          id="order-message"
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
          message="주문 문의가 접수되었습니다"
          receptionNumber={receptionNumber}
        />
      )}
      {status === 'error' && (
        <FormMessage status="error" message={error} onRetry={() => setStatus('idle')} />
      )}

      <div className="flex justify-end gap-2">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
          >
            닫기
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800 disabled:cursor-not-allowed disabled:bg-stone-400"
        >
          {isLoading ? '접수 중...' : '문의 접수'}
        </button>
      </div>
    </form>
  );
}
