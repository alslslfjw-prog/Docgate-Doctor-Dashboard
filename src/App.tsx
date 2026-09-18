// DocGate — Arabic RTL Mobile Healthcare Platform for Doctors
import { useState } from 'react'

// ── Types ────────────────────────────────────────────────────────────

type Screen =
  | 'welcome' | 'login' | 'register' | 'otp' | 'specialty'
  | 'forgot-password' | 'recovery-otp' | 'account-ready'
  | 'home' | 'profile-checklist' | 'doctor-profile'
  | 'notifications'
  | 'work-locations' | 'work-location-overview' | 'location-add-choice' | 'location-search' | 'location-info'
  | 'weekly-schedule' | 'schedule-30day' | 'day-editor' | 'conflict-review' | 'date-override'
  | 'session-editor' | 'holiday-block' | 'confirmation-policy'
  | 'services-prices' | 'bookings' | 'booking-details' | 'booking-checkin' | 'booking-cancel'
  | 'reschedule' | 'reschedule-success' | 'patient-controls'
  | 'finance' | 'finance-transactions' | 'finance-payment-settings'
  | 'patients' | 'messages' | 'more'
  | 'profile-basic-edit' | 'profile-professional' | 'profile-license' | 'profile-qualifications'
  | 'profile-experience' | 'profile-certificates'
  | 'schedule-setup' | 'onboarding-location' | 'schedule-done'
  | 'appointments'

type NavTab = 'home' | 'bookings' | 'appointments' | 'messages' | 'more'

type BookingStatus = 'pending' | 'confirmed' | 'checked-in' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'

const AUTH_SCREENS: Screen[] = ['welcome', 'login', 'register', 'otp', 'specialty']

// ── Utility ──────────────────────────────────────────────────────────

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

// ── Icons ────────────────────────────────────────────────────────────

function IcHome({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}
function IcCalendar({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}
function IcUser({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}
function IcMoney({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function IcMenu({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}
function IcBell({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  )
}
function IcChevronLeft({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}
function IcChevronRight({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}
function IcPlus({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  )
}
function IcSearch({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}
function IcMapPin({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}
function IcClock({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function IcCheck({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}
function IcPhone({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}
function IcMail({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}
function IcLock({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
}
function IcStar({ c = '' }: { c?: string }) {
  return (
    <svg className={c} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
function IcBuilding({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}
function IcDots({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
    </svg>
  )
}
function IcWhatsApp({ c = '' }: { c?: string }) {
  return (
    <svg className={c} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
function IcApple({ c = '' }: { c?: string }) {
  return (
    <svg className={c} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}
function IcFilter({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  )
}
function IcSettings({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

// ── UI Primitives ─────────────────────────────────────────────────────

function Btn({
  children, variant = 'primary', onClick, disabled, className,
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  onClick?: () => void
  disabled?: boolean
  className?: string
}) {
  const base = 'flex items-center justify-center gap-2 rounded-xl font-semibold text-[15px] py-[14px] px-6 transition-opacity w-full cursor-pointer'
  const v: Record<string, string> = {
    primary: 'bg-teal-primary text-white active:opacity-80',
    secondary: 'bg-teal-50 text-teal-primary border border-teal-200',
    outline: 'border-2 border-teal-primary text-teal-primary bg-transparent',
    ghost: 'text-teal-primary bg-transparent',
    destructive: 'bg-red-50 text-red-600 border border-red-200',
  }
  return (
    <button onClick={onClick} disabled={disabled} className={cn(base, v[variant], disabled && 'opacity-50', className)}>
      {children}
    </button>
  )
}

function Badge({ label, variant = 'default' }: { label: string; variant?: 'success' | 'warning' | 'error' | 'info' | 'teal' | 'default' | 'gray' }) {
  const v: Record<string, string> = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-600',
    info: 'bg-blue-100 text-blue-700',
    teal: 'bg-teal-50 text-teal-primary',
    default: 'bg-teal-50 text-teal-primary',
    gray: 'bg-gray-100 text-gray-500',
  }
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', v[variant])}>
      {label}
    </span>
  )
}

function InputField({
  label, placeholder, type = 'text', icon, value, onChange,
}: {
  label: string; placeholder?: string; type?: string; icon?: React.ReactNode; value?: string; onChange?: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-[#374040]">{label}</label>
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute right-3 text-[#8A9E9E] pointer-events-none">{icon}</span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          className={cn(
            'w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl py-3.5 text-[14px] text-[#1A2424] placeholder:text-[#B0C4C4] focus:outline-none focus:border-teal-primary transition-colors',
            icon ? 'pr-10 pl-4' : 'px-4'
          )}
        />
      </div>
    </div>
  )
}

function Divider() {
  return <div className="h-px bg-[#E8F0F0] mx-0" />
}

function SettingRow({
  icon, title, subtitle, onClick, right, danger,
}: {
  icon?: React.ReactNode; title: string; subtitle?: string; onClick?: () => void; right?: React.ReactNode; danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full py-3.5 px-4 hover:bg-[#F8FAFA] active:bg-[#F0FAFA] transition-colors text-right"
    >
      {icon && (
        <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 text-teal-primary">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className={cn('text-[14px] font-semibold', danger ? 'text-red-600' : 'text-[#1A2424]')}>{title}</p>
        {subtitle && <p className="text-[12px] text-[#8A9E9E] mt-0.5">{subtitle}</p>}
      </div>
      {right !== undefined ? right : <IcChevronLeft c="w-4 h-4 text-[#B0C4C4]" />}
    </button>
  )
}

function StatCard({ icon, value, label, color = 'teal' }: { icon: React.ReactNode; value: string | number; label: string; color?: 'teal' | 'blue' | 'green' | 'amber' }) {
  const bg: Record<string, string> = {
    teal: 'bg-teal-50 text-teal-primary',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
  }
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm">
      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', bg[color])}>
        {icon}
      </div>
      <p className="text-[20px] font-bold text-[#1A2424] leading-none">{value}</p>
      <p className="text-[12px] text-[#8A9E9E] mt-1">{label}</p>
    </div>
  )
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={cn('w-12 h-6 rounded-full transition-colors relative flex-shrink-0', on ? 'bg-teal-primary' : 'bg-gray-200')}
    >
      <span className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all', on ? 'right-0.5' : 'left-0.5')} />
    </button>
  )
}

// ── Layout Components ─────────────────────────────────────────────────

function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={cn('flex items-center justify-between px-6 pt-3 pb-1 flex-shrink-0', dark ? 'bg-teal-primary' : 'bg-white')}>
      <span className={cn('text-[13px] font-bold', dark ? 'text-white' : 'text-[#1A2424]')}>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg className={cn('w-4 h-3', dark ? 'text-white' : 'text-[#1A2424]')} viewBox="0 0 16 12" fill="currentColor">
          <rect x="0" y="4" width="3" height="8" rx="0.5" opacity="0.4"/>
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="0.5" opacity="0.7"/>
          <rect x="9" y="0" width="3" height="12" rx="0.5"/>
        </svg>
        <svg className={cn('w-4 h-3', dark ? 'text-white' : 'text-[#1A2424]')} viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 4.5C4 1.5 12 1.5 15 4.5M3.5 7C6 4.5 10 4.5 12.5 7M6 9.5C7.5 8 8.5 8 10 9.5"/>
          <circle cx="8" cy="11.5" r="0.7" fill="currentColor" stroke="none"/>
        </svg>
        <div className="flex items-center gap-0.5">
          <div className={cn('w-6 h-3 border rounded-sm flex items-center px-0.5', dark ? 'border-white' : 'border-[#1A2424]')}>
            <div className={cn('h-1.5 w-4 rounded-sm', dark ? 'bg-white' : 'bg-[#1A2424]')} />
          </div>
        </div>
      </div>
    </div>
  )
}

function TopBar({
  title, onBack, actions, dark = false,
}: {
  title: string; onBack?: () => void; actions?: React.ReactNode; dark?: boolean
}) {
  return (
    <div className={cn('flex items-center px-4 py-3 gap-3 flex-shrink-0', dark ? 'bg-teal-primary' : 'bg-white border-b border-[#E8F0F0]')}>
      {onBack && (
        <button onClick={onBack} className={cn('w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0', dark ? 'text-white' : 'text-[#374040]')}>
          <IcChevronRight c="w-5 h-5" />
        </button>
      )}
      <h1 className={cn('flex-1 text-[17px] font-bold text-center', dark ? 'text-white' : 'text-[#1A2424]', !onBack && 'pr-9')}>{title}</h1>
      {actions && <div className="flex items-center gap-1">{actions}</div>}
      {!actions && onBack && <div className="w-9" />}
    </div>
  )
}

function IcMessage({ c = '' }: { c?: string }) {
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

function BottomNav({ active, onTab }: { active: NavTab; onTab: (t: NavTab) => void }) {
  const tabs: { id: NavTab; label: string; icon: (c: string) => React.ReactNode }[] = [
    { id: 'more', label: 'المزيد', icon: c => <IcMenu c={c} /> },
    { id: 'messages', label: 'الرسائل', icon: c => <IcMessage c={c} /> },
    { id: 'appointments', label: 'المواعيد', icon: c => <IcCalendar c={c} /> },
    { id: 'bookings', label: 'الحجوزات', icon: c => <IcClock c={c} /> },
    { id: 'home', label: 'الرئيسية', icon: c => <IcHome c={c} /> },
  ]
  return (
    <div className="flex-shrink-0 bg-white border-t border-[#E8F0F0] flex pb-safe">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onTab(t.id)}
          className="flex-1 flex flex-col items-center py-2 gap-0.5"
        >
          {t.icon(cn('w-5 h-5', active === t.id ? 'text-teal-primary' : 'text-[#B0C4C4]'))}
          <span className={cn('text-[9px] font-semibold', active === t.id ? 'text-teal-primary' : 'text-[#B0C4C4]')}>
            {t.label}
          </span>
        </button>
      ))}
    </div>
  )
}

// ── Auth Screens ───────────────────────────────────────────────────────

function WelcomeScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-teal-50 to-white overflow-y-auto">
      <StatusBar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Logo */}
        <div className="w-24 h-24 rounded-3xl bg-teal-primary flex items-center justify-center shadow-lg mb-5">
          <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
            <circle cx="24" cy="24" r="20" fill="white" opacity="0.15"/>
            <path d="M24 10C18 10 14 16 14 22C14 30 24 40 24 40C24 40 34 30 34 22C34 16 30 10 24 10Z" fill="white"/>
            <path d="M20 22H24V18M24 18V22H28" stroke="#0B6E6E" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="24" cy="18" r="2" fill="#0B6E6E"/>
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-teal-primary tracking-tight">DocGate</h1>
        <p className="text-[15px] font-semibold text-[#374040] mt-1">منصة الأطباء المتكاملة</p>
        <p className="text-[13px] text-[#8A9E9E] mt-2 text-center leading-relaxed">
          إدارة أسهل · لممارسة طبية أفضل
        </p>

        <div className="w-full mt-12 flex flex-col gap-3">
          <Btn onClick={() => nav('login')}>تسجيل الدخول</Btn>
          <Btn variant="secondary" onClick={() => nav('register')}>إنشاء حساب جديد</Btn>
          <button onClick={() => nav('home')} className="flex items-center justify-center gap-1 text-[13px] text-teal-primary font-semibold py-2">
            استكشاف التطبيق
            <IcChevronLeft c="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-center text-[11px] text-[#B0C4C4] pb-6">معاً · لقطاع صحي أكثر كفاءة</p>
    </div>
  )
}

function LoginScreen({ nav }: { nav: (s: Screen) => void }) {
  const [tab, setTab] = useState<'phone' | 'email'>('phone')
  const [showPwd, setShowPwd] = useState(false)
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3">
        <button onClick={() => nav('welcome')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">تسجيل الدخول</h1>
        <div className="w-9" />
      </div>
      <div className="flex-1 px-5 pt-2 pb-6 flex flex-col gap-5">
        {/* Segmented control */}
        <div className="flex bg-[#F0F4F4] rounded-xl p-1">
          {(['phone', 'email'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn('flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all', tab === t ? 'bg-white text-teal-primary shadow-sm' : 'text-[#8A9E9E]')}
            >
              {t === 'phone' ? 'رقم الجوال' : 'البريد الإلكتروني'}
            </button>
          ))}
        </div>
        {tab === 'phone' ? (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#374040]">رقم الجوال</label>
              <div className="flex items-center bg-[#F8FAFA] border border-[#E0EDED] rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-3.5 border-l border-[#E0EDED] text-[13px] font-semibold text-[#374040]">
                  <span>🇾🇪</span><span>+967</span>
                </div>
                <input placeholder="5X XXX XXXX" className="flex-1 bg-transparent px-3 py-3.5 text-[14px] text-[#1A2424] placeholder:text-[#B0C4C4] focus:outline-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#374040]">كلمة المرور</label>
              <div className="relative">
                <IcLock c="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B0C4C4]" />
                <input type={showPwd ? 'text' : 'password'} placeholder="كلمة المرور" className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl pr-10 pl-10 py-3.5 text-[14px] focus:outline-none focus:border-teal-primary placeholder:text-[#B0C4C4]" />
                <button onClick={() => setShowPwd(!showPwd)} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0C4C4]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {showPwd ? <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /> : <><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>}
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#374040]">البريد الإلكتروني</label>
              <div className="relative">
                <IcMail c="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B0C4C4]" />
                <input type="email" placeholder="example@domain.com" className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl pr-10 pl-4 py-3.5 text-[14px] focus:outline-none focus:border-teal-primary placeholder:text-[#B0C4C4]" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#374040]">كلمة المرور</label>
              <div className="relative">
                <IcLock c="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B0C4C4]" />
                <input type="password" className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl pr-10 pl-4 py-3.5 text-[14px] focus:outline-none focus:border-teal-primary placeholder:text-[#B0C4C4]" />
              </div>
            </div>
          </>
        )}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[13px] text-[#5A7070]">
            <input type="checkbox" className="accent-teal-primary" />
            تذكرني
          </label>
          <button onClick={() => nav('forgot-password')} className="text-[13px] text-teal-primary font-semibold">نسيت كلمة المرور؟</button>
        </div>
        <Btn onClick={() => nav('home')}>تسجيل الدخول</Btn>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#E8F0F0]" />
          <span className="text-[12px] text-[#B0C4C4]">أو</span>
          <div className="flex-1 h-px bg-[#E8F0F0]" />
        </div>
        <button className="flex items-center justify-center gap-2 border border-[#E0EDED] rounded-xl py-3.5 text-[14px] font-semibold text-[#374040]">
          <IcApple c="w-5 h-5" />
          المتابعة باستخدام Apple
        </button>
        <p className="text-center text-[13px] text-[#8A9E9E]">
          ليس لديك حساب؟{' '}
          <button onClick={() => nav('register')} className="text-teal-primary font-semibold">إنشاء حساب جديد</button>
        </p>
      </div>
    </div>
  )
}

function RegisterScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3">
        <button onClick={() => nav('login')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">إنشاء حساب جديد</h1>
        <div className="w-9" />
      </div>
      <div className="flex-1 px-5 pt-2 pb-6 flex flex-col gap-4">
        <InputField label="الاسم الكامل" placeholder="د. محمد الشمري" icon={<IcUser c="w-5 h-5" />} />
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#374040]">رقم واتساب</label>
          <div className="flex items-center bg-[#F8FAFA] border border-[#E0EDED] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-3.5 border-l border-[#E0EDED] text-[13px] font-semibold text-[#374040] flex-shrink-0">
              <span>🇾🇪</span><span>+967</span>
              <IcChevronLeft c="w-3 h-3 text-[#B0C4C4]" />
            </div>
            <input placeholder="7XX XXX XXX" className="flex-1 bg-transparent px-3 py-3.5 text-[14px] placeholder:text-[#B0C4C4] focus:outline-none" />
          </div>
          <p className="text-[12px] text-[#8A9E9E] mt-0.5">سيتم إرسال رمز التحقق إلى هذا الرقم عبر واتساب</p>
        </div>
        <InputField label="البريد الإلكتروني" placeholder="example@domain.com" type="email" icon={<IcMail c="w-5 h-5" />} />
        <InputField label="كلمة المرور" placeholder="8 أحرف على الأقل" type="password" icon={<IcLock c="w-5 h-5" />} />
        <InputField label="تأكيد كلمة المرور" placeholder="أعد كتابة كلمة المرور" type="password" icon={<IcLock c="w-5 h-5" />} />
        <Btn onClick={() => nav('otp')}>إنشاء الحساب</Btn>
        <p className="text-center text-[12px] text-[#8A9E9E] leading-relaxed">
          بإنشاء حساب، فإنك توافق على{' '}
          <span className="text-teal-primary font-semibold">الشروط والأحكام وسياسة الخصوصية</span>
        </p>
        <p className="text-center text-[13px] text-[#8A9E9E]">
          لديك حساب بالفعل؟{' '}
          <button onClick={() => nav('login')} className="text-teal-primary font-semibold">تسجيل الدخول</button>
        </p>
      </div>
    </div>
  )
}

function OTPScreen({ nav }: { nav: (s: Screen) => void }) {
  const [digits, setDigits] = useState(['4', '7', '2', '9', '1', '6'])
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3">
        <button onClick={() => nav('register')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">التحقق عبر واتساب</h1>
        <div className="w-9" />
      </div>
      <div className="flex-1 px-5 flex flex-col items-center gap-6 pt-6 pb-6">
        {/* WhatsApp icon */}
        <div className="w-20 h-20 rounded-3xl bg-[#25D366]/10 flex items-center justify-center">
          <IcWhatsApp c="w-11 h-11 text-[#25D366]" />
        </div>
        <div className="text-center">
          <p className="text-[15px] font-semibold text-[#1A2424]">تم إرسال رمز التحقق إلى رقمك عبر واتساب</p>
          <p className="text-[14px] text-teal-primary font-bold mt-1" dir="ltr">+967 7XX XXX XXX</p>
        </div>
        {/* OTP inputs */}
        <div className="flex gap-3 justify-center">
          {digits.map((d, i) => (
            <div key={i} className="w-12 h-14 bg-teal-50 border-2 border-teal-primary rounded-xl flex items-center justify-center text-[22px] font-bold text-teal-primary">
              {d}
            </div>
          ))}
        </div>
        <p className="text-[13px] text-[#8A9E9E]">
          سيتم إعادة الإرسال خلال{' '}
          <span className="text-teal-primary font-bold">00:45</span>
        </p>
        <div className="w-full flex flex-col gap-3 mt-4">
          <Btn onClick={() => nav('specialty')}>تحقق من الرمز</Btn>
          <Btn variant="secondary">إعادة إرسال الرمز</Btn>
          <button className="text-[13px] text-[#8A9E9E] py-2">تغيير رقم واتساب</button>
        </div>
        <div className="flex items-start gap-2 bg-blue-50 rounded-xl px-4 py-3 w-full">
          <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
          </svg>
          <p className="text-[12px] text-blue-700 leading-relaxed">يرجى إدخال الرمز المرسل عبر واتساب لإكمال عملية التسجيل</p>
        </div>
      </div>
    </div>
  )
}

function SpecialtyScreen({ nav }: { nav: (s: Screen) => void }) {
  const [specialty, setSpecialty] = useState('')
  const [title, setTitle] = useState('')
  const [customSpecialty, setCustomSpecialty] = useState('')
  const [uploadedDoc, setUploadedDoc] = useState<{ name: string; size: string } | null>(null)
  const specialties = ['طب عام', 'أمراض باطنية', 'جراحة عامة', 'أطفال', 'نساء وتوليد', 'عظام', 'قلب', 'أعصاب', 'عيون', 'أنف وأذن وحنجرة', 'جلدية', 'نفسية', 'تخصص آخر غير موجود']
  const titles = ['طبيب عام', 'أخصائي', 'استشاري', 'أستاذ دكتور']
  const handleFilePick = () => {
    // Simulate file selection
    setUploadedDoc({ name: 'شهادة_مزاولة_المهنة.pdf', size: '1.2 MB' })
  }
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3">
        <button onClick={() => nav('otp')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">البيانات المهنية</h1>
        <div className="w-9" />
      </div>
      <div className="flex-1 px-5 pt-2 pb-6 flex flex-col gap-5">
        <div className="bg-teal-50 rounded-2xl p-4">
          <p className="text-[13px] text-teal-primary font-semibold">أدخل بياناتك المهنية حتى يتمكن المرضى من العثور عليك في DocGate</p>
        </div>
        {/* Specialty */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#374040]">التخصص الطبي</label>
          <select
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
            className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-4 py-3.5 text-[14px] text-[#1A2424] focus:outline-none focus:border-teal-primary"
          >
            <option value="">اختر التخصص</option>
            {specialties.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        {specialty === 'تخصص آخر غير موجود' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#374040]">التخصص الطبي</label>
            <input
              type="text"
              placeholder="أدخل تخصصك الطبي"
              value={customSpecialty}
              onChange={e => setCustomSpecialty(e.target.value)}
              className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-4 py-3.5 text-[14px] text-[#1A2424] placeholder:text-[#B0C4C4] focus:outline-none focus:border-teal-primary"
            />
          </div>
        )}
        {/* Professional Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#374040]">المسمى المهني</label>
          <div className="flex flex-wrap gap-2">
            {titles.map(t => (
              <button
                key={t}
                onClick={() => setTitle(t)}
                className={cn('px-4 py-2.5 rounded-xl text-[13px] font-semibold border transition-all', title === t ? 'bg-teal-primary text-white border-teal-primary' : 'bg-[#F8FAFA] text-[#374040] border-[#E0EDED]')}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        {/* Professional Document Upload */}
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[14px] font-bold text-[#1A2424]">توثيق المهنة</p>
            <p className="text-[12px] text-[#8A9E9E] mt-0.5">ارفع وثيقة تساعدنا على التحقق من بياناتك المهنية</p>
          </div>
          {!uploadedDoc ? (
            <button
              onClick={handleFilePick}
              className="w-full border-2 border-dashed border-[#C5E0E0] rounded-2xl p-5 flex flex-col items-center gap-2 text-center bg-[#F8FAFA] hover:bg-teal-50 hover:border-teal-primary transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <p className="text-[14px] font-bold text-[#1A2424]">رفع وثيقة التحقق المهني</p>
              <p className="text-[12px] text-[#8A9E9E]">شهادة مزاولة المهنة أو الشهادة الجامعية</p>
              <div className="flex items-center gap-2 mt-1">
                {['PDF', 'JPG', 'PNG'].map(fmt => (
                  <span key={fmt} className="text-[11px] font-semibold text-teal-primary bg-teal-50 border border-teal-100 rounded-lg px-2 py-0.5">{fmt}</span>
                ))}
              </div>
            </button>
          ) : (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-teal-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-[13px] font-bold text-[#1A2424] truncate">{uploadedDoc.name}</p>
                  <p className="text-[11px] text-[#8A9E9E]">{uploadedDoc.size}</p>
                </div>
                <IcCheck c="w-5 h-5 text-teal-primary flex-shrink-0" />
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => setUploadedDoc(null)} className="flex-1 text-[12px] font-semibold text-red-500 border border-red-200 rounded-xl py-2 bg-white">حذف</button>
                <button onClick={handleFilePick} className="flex-1 text-[12px] font-semibold text-teal-primary border border-teal-200 rounded-xl py-2 bg-white">استبدال</button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-auto flex flex-col gap-3 pt-2">
          <Btn
            disabled={!(
              specialty !== '' &&
              (specialty !== 'تخصص آخر غير موجود' || customSpecialty.trim().length > 0) &&
              title !== '' &&
              uploadedDoc !== null
            )}
            onClick={() => nav('onboarding-location')}
          >
            التالي
          </Btn>
        </div>
      </div>
    </div>
  )
}

// ── Home Screen ────────────────────────────────────────────────────────

function HomeScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      {/* Teal header */}
      <div className="bg-teal-primary px-5 pt-0 pb-6">
        <StatusBar dark />
        <div className="flex items-center justify-between mt-2">
          <button onClick={() => nav('notifications')} className="relative w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <IcBell c="w-5 h-5 text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full" />
          </button>
          <div className="text-right">
            <p className="text-white/70 text-[12px]">الأحد، 8 سبتمبر 2026</p>
            <h1 className="text-white text-[19px] font-bold mt-0.5">مرحباً د. أحمد</h1>
          </div>
          <button onClick={() => nav('doctor-profile')} className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
            <IcUser c="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Today stats card */}
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-md p-4 border border-[#E8F0F0]">
          <p className="text-[12px] font-semibold text-[#8A9E9E] mb-3 text-right">مواعيد اليوم — الأحد 8 سبتمبر</p>
          <div className="grid grid-cols-3 gap-0 divide-x divide-x-reverse divide-[#E8F0F0]">
            {[
              { val: '12', label: 'إجمالي', color: 'text-teal-primary' },
              { val: '4', label: 'قيد الانتظار', color: 'text-amber-500' },
              { val: '6', label: 'تمت المعاينة', color: 'text-green-600' },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center py-1 first:pr-0 last:pl-0">
                <p className={cn('text-[24px] font-extrabold', s.color)}>{s.val}</p>
                <p className="text-[11px] text-[#8A9E9E]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* يحتاج انتباهك */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <p className="text-[13px] font-bold text-[#1A2424]">يحتاج انتباهك</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm overflow-hidden">
          {[
            { icon: '📋', text: 'حجزان ينتظران التأكيد', action: () => nav('bookings'), color: 'bg-amber-50' },
            { icon: '👤', text: 'ملفك المهني مكتمل بنسبة 20%', action: () => nav('profile-checklist'), color: 'bg-blue-50' },
          ].map((item, i) => (
            <button key={i} onClick={item.action} className="w-full flex items-center gap-3 px-4 py-3 text-right border-b border-[#F0F4F4] last:border-0">
              <IcChevronLeft c="w-4 h-4 text-[#B0C4C4]" />
              <p className="flex-1 text-[13px] text-[#374040] font-medium">{item.text}</p>
              <span className={cn('w-8 h-8 rounded-xl flex items-center justify-center text-[16px]', item.color)}>{item.icon}</span>
            </button>
          ))}
        </div>
      </div>

      {/* جدولك القادم — multi-location shift cards */}
      <div className="px-4 mt-4">
        <p className="text-[13px] font-bold text-[#1A2424] mb-3 text-right">جدولك القادم</p>
        <div className="flex flex-col gap-3">

          {/* Shift 1: برج الأطباء — morning */}
          <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm overflow-hidden">
            <div className="bg-gradient-to-l from-teal-primary/10 to-teal-primary/5 px-4 py-3 border-b border-[#E8F0F0]">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-teal-primary font-semibold">08:00 ص – 01:00 م</p>
                <div className="text-right">
                  <p className="text-[14px] font-bold text-[#1A2424]">مركز المدينة الطبي</p>
                  <p className="text-[11px] text-[#8A9E9E]">غداً · الفترة الصباحية</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 flex flex-col gap-1.5">
              {[
                { time: '09:00 ص', name: 'محمد عبدالله', service: 'استشارة عامة', status: 'مؤكد', sv: 'teal' },
                { time: '09:30 ص', name: 'سارة أحمد', service: 'متابعة', status: 'مؤكد', sv: 'teal' },
                { time: '10:30 ص', name: 'خالد سالم', service: 'استشارة تخصصية', status: 'انتظار', sv: 'warning' },
              ].map((b, i) => (
                <button key={i} onClick={() => nav('booking-details')}
                  className="flex items-center justify-between w-full py-2 border-b border-[#F8FAFA] last:border-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <IcUser c="w-3.5 h-3.5 text-teal-primary" />
                    </div>
                    <div className="min-w-0 text-right">
                      <p className="text-[12px] font-bold text-[#1A2424]">{b.name}</p>
                      <p className="text-[10px] text-[#8A9E9E]">{b.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Badge label={b.status} variant={b.sv as 'teal' | 'warning'} />
                    <span className="text-[11px] text-[#8A9E9E]">{b.time}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="px-4 pb-3">
              <button onClick={() => nav('appointments')} className="w-full text-[12px] text-teal-primary font-semibold py-2 bg-teal-50 rounded-xl">
                عرض كل المواعيد · 3 مرضى
              </button>
            </div>
          </div>

          {/* Shift 2: مستشفى الجمهورية — afternoon */}
          <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm overflow-hidden">
            <div className="bg-gradient-to-l from-blue-500/10 to-blue-500/5 px-4 py-3 border-b border-[#E8F0F0]">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-blue-600 font-semibold">04:00 م – 08:00 م</p>
                <div className="text-right">
                  <p className="text-[14px] font-bold text-[#1A2424]">مستشفى الجمهورية</p>
                  <p className="text-[11px] text-[#8A9E9E]">غداً · الفترة المسائية</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 flex flex-col gap-1.5">
              {[
                { time: '04:30 م', name: 'نورة علي', service: 'استشارة عامة', status: 'مؤكد', sv: 'teal' },
                { time: '05:00 م', name: 'أحمد محمد', service: 'فحص دوري', status: 'انتظار', sv: 'warning' },
              ].map((b, i) => (
                <button key={i} onClick={() => nav('booking-details')}
                  className="flex items-center justify-between w-full py-2 border-b border-[#F8FAFA] last:border-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <IcUser c="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div className="min-w-0 text-right">
                      <p className="text-[12px] font-bold text-[#1A2424]">{b.name}</p>
                      <p className="text-[10px] text-[#8A9E9E]">{b.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Badge label={b.status} variant={b.sv as 'teal' | 'warning'} />
                    <span className="text-[11px] text-[#8A9E9E]">{b.time}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="px-4 pb-3">
              <button onClick={() => nav('appointments')} className="w-full text-[12px] text-blue-600 font-semibold py-2 bg-blue-50 rounded-xl">
                عرض كل المواعيد · 2 مرضى
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="h-6" />
    </div>
  )
}

// ── Profile Checklist ──────────────────────────────────────────────────

function ProfileChecklistScreen({ nav }: { nav: (s: Screen) => void }) {
  const items: { label: string; sub: string; done: boolean; screen: Screen | null }[] = [
    { label: 'المعلومات الأساسية', sub: 'الاسم ومعلومات التواصل', done: true, screen: 'profile-basic-edit' },
    { label: 'المعلومات المهنية', sub: 'التخصص والمسمى والخبرة', done: true, screen: 'profile-professional' },
    { label: 'الترخيص الطبي', sub: 'رقم الترخيص والهيئة المانحة', done: false, screen: 'profile-license' },
    { label: 'المؤهلات العلمية', sub: 'الشهادات والدرجات العلمية', done: false, screen: 'profile-qualifications' },
    { label: 'الشهادات', sub: 'شهادات وبرامج التدريب', done: false, screen: 'profile-certificates' },
    { label: 'الخبرات العملية', sub: 'سجل مسيرتك المهنية', done: false, screen: 'profile-experience' },
    { label: 'مواقع العمل', sub: 'العيادات والمستشفيات', done: false, screen: 'work-locations' },
    { label: 'التحقق من الهوية', sub: 'هوية وطنية أو جواز سفر', done: false, screen: null },
  ]
  const doneCount = items.filter(i => i.done).length
  const pct = Math.round((doneCount / items.length) * 100)
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <TopBar title="إكمال الملف الشخصي" onBack={() => nav('home')} dark />
      </div>
      <div className="bg-white mx-4 mt-4 rounded-2xl p-4 border border-[#E8F0F0] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
            <IcUser c="w-8 h-8 text-teal-primary" />
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-bold text-[#1A2424]">د. أحمد سالم</p>
            <p className="text-[12px] text-[#8A9E9E]">استشاري طب الباطنة والجهاز الهضمي</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[12px] text-[#8A9E9E]">{doneCount} من {items.length} مكتملة</p>
            <p className="text-[14px] font-bold text-teal-primary">{pct}%</p>
          </div>
          <div className="w-full bg-[#E8F0F0] rounded-full h-2.5">
            <div className="bg-teal-primary h-2.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
      <div className="mx-4 mt-3 bg-teal-50 rounded-xl p-3 border border-teal-100">
        <p className="text-[12px] text-teal-primary leading-relaxed text-right">يمكنك استخدام لوحة التحكم الآن، ويُفضّل إكمال ملفك المهني لزيادة موثوقية حسابك وظهوره للمرضى.</p>
      </div>
      <div className="px-4 mt-3 flex flex-col gap-2">
        {items.map((item, i) => (
          <button key={i} onClick={() => item.screen && nav(item.screen as Screen)}
            className={cn('bg-white rounded-2xl p-4 border shadow-sm flex items-center gap-3 w-full text-right', item.done ? 'border-green-200' : 'border-[#E8F0F0]')}>
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', item.done ? 'bg-green-100' : 'bg-[#F0F4F4]')}>
              {item.done ? <IcCheck c="w-5 h-5 text-green-600" /> : <span className="text-[13px] text-[#B0C4C4] font-bold">{i + 1}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn('text-[14px] font-semibold', item.done ? 'text-green-700' : 'text-[#1A2424]')}>{item.label}</p>
              <p className="text-[12px] text-[#8A9E9E] mt-0.5">{item.sub}</p>
            </div>
            {item.done ? (
              <Badge label="مكتمل" variant="success" />
            ) : (
              <IcChevronLeft c="w-4 h-4 text-[#B0C4C4]" />
            )}
          </button>
        ))}
      </div>
      <div className="px-4 mt-5 pb-6">
        <Btn variant="secondary" onClick={() => nav('home')}>إكمال لاحقاً</Btn>
      </div>
    </div>
  )
}

// ── Doctor Profile ─────────────────────────────────────────────────────

function DoctorProfileScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <div className="flex items-center px-4 py-3 gap-3">
          <button onClick={() => nav('home')} className="w-9 h-9 flex items-center justify-center text-white">
            <IcChevronRight c="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center text-[17px] font-bold text-white">الملف الشخصي</h1>
          <button className="w-9 h-9 flex items-center justify-center text-white">
            <IcDots c="w-5 h-5" />
          </button>
        </div>
        {/* Avatar area */}
        <div className="flex flex-col items-center pb-6 pt-2">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center border-4 border-white/50">
              <IcUser c="w-10 h-10 text-white" />
            </div>
            <button className="absolute bottom-0 left-0 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center">
              <svg className="w-4 h-4 text-teal-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </button>
          </div>
          <h2 className="text-white text-[18px] font-bold mt-3">د. أحمد سالم</h2>
          <p className="text-white/80 text-[13px]">استشاري طب الباطنة والجهاز الهضمي</p>
          <p className="text-white/60 text-[12px] mt-0.5">رقم الترخيص: 123456</p>
        </div>
      </div>

      <div className="px-4 mt-4 flex flex-col gap-3">
        {/* Bio */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <button className="text-[12px] text-teal-primary font-semibold">تعديل</button>
            <p className="text-[14px] font-bold text-[#1A2424]">نبذة تعريفية</p>
          </div>
          <p className="text-[13px] text-[#5A7070] leading-relaxed text-right">
            استشاري طب الباطنة والجهاز الهضمي مع أكثر من 10 سنوات من الخبرة في تشخيص وعلاج الحالات المرضية، وتقديم رعاية صحية شاملة ومتكاملة للمرضى.
          </p>
        </div>

        {/* Info sections */}
        {[
          { title: 'التخصص', value: 'أمراض الباطنية', icon: <IcUser c="w-4 h-4" /> },
          { title: 'المؤهلات العلمية', value: 'بورد الباطنة — جامعة الملك سعود', icon: <IcCheck c="w-4 h-4" /> },
          { title: 'الجهة', value: 'الهيئة السعودية للتخصصات الصحية', icon: <IcBuilding c="w-4 h-4" /> },
        ].map(row => (
          <div key={row.title} className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm">
            <SettingRow icon={row.icon} title={row.title} subtitle={row.value} />
          </div>
        ))}

        {/* Languages */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm">
          <p className="text-[14px] font-bold text-[#1A2424] mb-3">اللغات</p>
          <div className="flex gap-2 flex-wrap">
            <Badge label="العربية" variant="teal" />
            <Badge label="الإنجليزية" variant="default" />
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <button className="text-[12px] text-teal-primary font-semibold">تعديل</button>
            <p className="text-[14px] font-bold text-[#1A2424]">سنوات الخبرة</p>
          </div>
          <p className="text-[13px] text-[#5A7070]">أكثر من 10 سنوات</p>
        </div>
      </div>
      <div className="h-6" />
    </div>
  )
}

// ── Work Locations ─────────────────────────────────────────────────────

function WorkLocationsScreen({ nav }: { nav: (s: Screen) => void }) {
  const locations = [
    { name: 'مركز المدينة الطبي', type: 'مركز طبي', city: 'عدن – المنصورة', status: 'نشط', active: true, verified: true },
    { name: 'مستشفى الجمهورية التعليمي', type: 'مستشفى تعليمي', city: 'عدن – خور مكسر', status: 'موثق', active: true, verified: true },
    { name: 'مستشفى عدن العام', type: 'مستشفى عام', city: 'عدن', status: 'موثق', active: true, verified: true },
    { name: 'عيادة د. أحمد الخاصة', type: 'عيادة خاصة', city: 'عدن – كريتر', status: 'غير موثق بعد', active: false, verified: false },
  ]
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <div className="flex items-center px-4 py-3 gap-3">
          <button onClick={() => nav('home')} className="w-9 h-9 flex items-center justify-center text-white">
            <IcChevronRight c="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center text-[17px] font-bold text-white">مواقع العمل</h1>
          <div className="w-9" />
        </div>
      </div>
      <div className="flex-1 px-4 pt-4 flex flex-col gap-3">
        {locations.map((loc, i) => (
          <button
            key={i}
            onClick={() => nav('work-location-overview')}
            className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                <IcBuilding c="w-6 h-6 text-teal-primary" />
              </div>
              <div className="min-w-0 text-right">
                <p className="text-[14px] font-bold text-[#1A2424]">{loc.name}</p>
                <p className="text-[12px] text-[#8A9E9E] mt-1">{loc.type} · {loc.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge label={loc.status} variant={loc.verified ? (loc.active ? 'teal' : 'success') : 'warning'} />
              <IcChevronLeft c="w-4 h-4 text-[#B0C4C4]" />
            </div>
          </button>
        ))}
      </div>
      <div className="px-4 py-5">
        <Btn onClick={() => nav('location-add-choice')}>
          <IcPlus c="w-5 h-5" />
          إضافة موقع عمل جديد
        </Btn>
      </div>
    </div>
  )
}

// ── Work Location Overview ─────────────────────────────────────────────

type WLTab = 'overview' | 'services' | 'settings'

function WorkLocationOverviewScreen({ nav }: { nav: (s: Screen) => void }) {
  const [tab, setTab] = useState<WLTab>('overview')
  const tabs: { id: WLTab; label: string }[] = [
    { id: 'overview', label: 'نظرة عامة' },
    { id: 'services', label: 'الخدمات' },
    { id: 'settings', label: 'الإعدادات' },
  ]
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <div className="flex items-center px-4 py-3 gap-3">
          <button onClick={() => nav('work-locations')} className="w-9 h-9 flex items-center justify-center text-white">
            <IcChevronRight c="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center text-[17px] font-bold text-white">موقع العمل</h1>
          <button className="w-9 h-9 flex items-center justify-center text-white">
            <IcDots c="w-5 h-5" />
          </button>
        </div>
        {/* Location name */}
        <div className="px-5 pb-4">
          <p className="text-white text-[16px] font-bold">مجمع الصحة العام</p>
          <div className="flex items-center gap-1.5 mt-1">
            <Badge label="مفعّل" variant="success" />
            <button className="flex items-center gap-1 text-white/70 text-[12px]">
              <IcMapPin c="w-3.5 h-3.5" />
              عدن – المنصورة · عرض الموقع
            </button>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="bg-white border-b border-[#E8F0F0] overflow-x-auto">
        <div className="flex">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id)
                if (t.id === 'services') nav('services-prices')
                if (t.id === 'settings') nav('confirmation-policy')
              }}
              className={cn('flex-shrink-0 px-4 py-3 text-[13px] font-semibold border-b-2 transition-colors', tab === t.id ? 'text-teal-primary border-teal-primary' : 'text-[#8A9E9E] border-transparent')}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview content */}
      <div className="flex-1 px-4 pt-4 flex flex-col gap-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={<IcCalendar c="w-5 h-5" />} value="286" label="المواعيد هذا الشهر" color="teal" />
          <StatCard icon={<IcUser c="w-5 h-5" />} value="1,204" label="المرضى الكلي" color="blue" />
          <StatCard icon={<IcBuilding c="w-5 h-5" />} value="3" label="عدد العيادات" color="green" />
          <div className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm">
            <div className="flex items-center gap-1 mb-3">
              <IcStar c="w-4 h-4 text-amber-400" />
              <IcStar c="w-4 h-4 text-amber-400" />
              <IcStar c="w-4 h-4 text-amber-400" />
              <IcStar c="w-4 h-4 text-amber-400" />
              <IcStar c="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-[20px] font-bold text-[#1A2424] leading-none">4.7</p>
            <p className="text-[12px] text-[#8A9E9E] mt-1">متوسط التقييم</p>
          </div>
        </div>
        {/* Location info */}
        <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm">
          <button onClick={() => nav('location-info')} className="px-4 py-3 border-b border-[#E8F0F0] w-full flex items-center justify-between">
            <IcChevronLeft c="w-4 h-4 text-[#B0C4C4]" />
            <p className="text-[14px] font-bold text-[#1A2424]">معلومات الموقع</p>
          </button>
          {[
            { label: 'النوع', val: 'مركز طبي' },
            { label: 'العنوان', val: 'عدن – المنصورة' },
            { label: 'ساعات العمل', val: 'من 8:00 ص إلى 10:00 م' },
            { label: 'رقم التواصل', val: '+967 2 XXX XXXX' },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between px-4 py-3 border-b border-[#E8F0F0] last:border-0">
              <p className="text-[13px] text-[#5A7070]">{r.val}</p>
              <p className="text-[13px] font-semibold text-[#1A2424]">{r.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="h-6" />
    </div>
  )
}

// ── Weekly Schedule ────────────────────────────────────────────────────

function WeeklyScheduleScreen({ nav, onboarding = false }: { nav: (s: Screen) => void; onboarding?: boolean }) {
  const [schedTab, setSchedTab] = useState<'weekly'>('weekly')

  const weekDays = [
    { name: 'السبت', status: 'يعمل', detail: '08:00–13:00 · جلسة واحدة', active: true },
    { name: 'الأحد', status: 'يعمل', detail: 'فترتان · 08:00–12:00 و 15:00–18:00', active: true },
    { name: 'الاثنين', status: 'يعمل', detail: '09:00–14:00 · جلستان', active: true },
    { name: 'الثلاثاء', status: 'يعمل', detail: '08:00–13:00 · جلسة واحدة', active: true },
    { name: 'الأربعاء', status: 'يعمل', detail: '10:00–15:00 · جلسة واحدة', active: true },
    { name: 'الخميس', status: 'يعمل', detail: 'فترتان · 08:00–13:00 و 17:00–20:00', active: true },
    { name: 'الجمعة', status: 'إجازة أسبوعية', detail: 'إجازة أسبوعية', active: false },
  ]


  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-hidden">
      <div className="bg-teal-primary flex-shrink-0">
        <StatusBar dark />
        <div className="flex items-center px-4 py-3 gap-3">
          <button onClick={() => nav(onboarding ? 'onboarding-location' : 'appointments')} className="w-9 h-9 flex items-center justify-center text-white">
            <IcChevronRight c="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center text-[17px] font-bold text-white">الجدول الزمني</h1>
          <div className="w-9" />
        </div>
        <div className="px-5 pb-3 flex items-center gap-1.5">
          <IcMapPin c="w-3.5 h-3.5 text-white/60" />
          <p className="text-white/60 text-[11px]">مركز المدينة الطبي · عدن – المنصورة</p>
        </div>
      </div>

      {/* Segmented control */}
      <div className="bg-white border-b border-[#E8F0F0] px-4 py-2.5 flex-shrink-0">
        <div className="flex bg-[#F0F4F4] rounded-xl p-1 gap-1">
                  <button onClick={() => setSchedTab('weekly')}
              className={cn('flex-1 py-2 rounded-lg text-[13px] font-bold transition-all', schedTab === 'weekly' ? 'bg-white text-teal-primary shadow-sm' : 'text-[#8A9E9E]')}>
              الجدول الأسبوعي
            </button>
            <button onClick={() => nav('schedule-30day')}
              className="flex-1 py-2 rounded-lg text-[13px] font-bold text-[#8A9E9E] transition-all">
              الأيام الـ30 القادمة
            </button>
        </div>
      </div>

      {/* Weekly tab */}
      {schedTab === 'weekly' && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pt-4 pb-6 flex flex-col gap-2">
            {weekDays.map((day, i) => (
              <button key={i} onClick={() => nav('day-editor')}
                className="bg-white rounded-2xl px-4 py-3.5 border border-[#E8F0F0] shadow-sm flex items-center gap-3 w-full text-right">
                <IcChevronLeft c="w-4 h-4 text-[#B0C4C4] flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={cn('text-[12px] font-semibold', day.active ? 'text-teal-primary' : 'text-[#8A9E9E]')}>{day.status}</span>
                    <p className="text-[14px] font-bold text-[#1A2424]">{day.name}</p>
                  </div>
                  {day.active && <p className="text-[11px] text-[#8A9E9E] mt-0.5">{day.detail}</p>}
                </div>
                <div className={cn('w-2 h-2 rounded-full flex-shrink-0', day.active ? 'bg-teal-primary' : 'bg-gray-200')} />
              </button>
            ))}
            <Btn onClick={() => nav('session-editor')} variant="secondary" className="mt-2">
              <IcPlus c="w-4 h-4" />
              إضافة جلسة لأحد الأيام
            </Btn>
            {onboarding ? (
              <Btn onClick={() => nav('schedule-done')} className="mt-1">حفظ الجدول</Btn>
            ) : (
              <Btn onClick={() => nav('weekly-schedule')} className="mt-1">حفظ الجدول</Btn>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

// ── 30-Day Schedule ────────────────────────────────────────────────────

function Schedule30DayScreen({ nav }: { nav: (s: Screen) => void }) {
  type DayStatus = 'متاح' | 'مغلق' | 'إجازة' | 'ممتلئ' | 'غير معد' | 'انتهت نافذة الحجز'
  type Sess = { id: string; from: string; to: string; duration: number }
  type Override = { status: 'متاح' | 'مغلق' | 'إجازة' | 'ممتلئ'; sessions?: Sess[]; partialBlock?: { from: string; to: string }; holidayReason?: string }
  type Sheet = 'day-editor' | 'partial-block' | 'holiday-range' | 'restore-confirm' | 'close-confirm' | 'conflict' | 'unsaved-exit' | null

  const TODAY = new Date(2026, 8, 9)
  const WIN_END = new Date(2026, 9, 8)
  const fmt = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  const todayKey = fmt(TODAY)

  // JS day → our index: 0=Sat,1=Sun,2=Mon,3=Tue,4=Wed,5=Thu,6=Fri
  const getDow = (d: Date) => { const j = d.getDay(); return j === 6 ? 0 : j + 1 }

  const weeklyDefault = (dow: number): { status: DayStatus; sessions: Sess[] } => {
    if (dow === 6) return { status: 'مغلق', sessions: [] }
    return { status: 'متاح', sessions: [{ id: 'w1', from: '08:00', to: '13:00', duration: 15 }] }
  }

  const ARABIC_DAYS = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
  const ARABIC_MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']

  const formatT = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    const ap = h < 12 ? 'ص' : 'م'
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h
    return `${h12}:${String(m).padStart(2,'0')} ${ap}`
  }
  const slotCount = (s: Sess) => {
    const [fh, fm] = s.from.split(':').map(Number)
    const [th, tm] = s.to.split(':').map(Number)
    return Math.floor(((th*60+tm)-(fh*60+fm))/s.duration)
  }

  const MOCK_BOOKINGS: Record<string, { time: string; name: string; service: string }[]> = {
    '2026-09-17': [
      { time: '09:00 ص', name: 'محمد عبدالله', service: 'استشارة عامة' },
      { time: '10:30 ص', name: 'سارة أحمد', service: 'متابعة' },
      { time: '12:00 م', name: 'خالد سالم', service: 'استشارة تخصصية' },
    ],
    '2026-09-12': [
      { time: '08:00 ص', name: 'أحمد علي', service: 'استشارة عامة' },
      { time: '08:15 ص', name: 'نورة محمد', service: 'متابعة' },
    ],
  }

  const [viewMonth, setViewMonth] = useState(8)
  const [selectedKey, setSelectedKey] = useState<string | null>('2026-09-17')
  const [overrides, setOverrides] = useState<Record<string, Override>>({
    '2026-09-17': { status: 'متاح', sessions: [
      { id: 'd1', from: '08:00', to: '13:00', duration: 15 },
      { id: 'd2', from: '17:00', to: '20:00', duration: 30 },
    ]},
    '2026-09-18': { status: 'إجازة', holidayReason: 'إجازة شخصية' },
    '2026-09-20': { status: 'متاح', sessions: [{ id: 'd3', from: '08:00', to: '13:00', duration: 15 }], partialBlock: { from: '01:00 م', to: '03:00 م' } },
    '2026-09-12': { status: 'ممتلئ' },
    '2026-09-25': { status: 'مغلق' },
  })
  const [hasUnsaved, setHasUnsaved] = useState(false)
  const [activeSheet, setActiveSheet] = useState<Sheet>(null)

  const [editStatus, setEditStatus] = useState<'متاح' | 'مغلق' | 'إجازة'>('متاح')
  const [editSessions, setEditSessions] = useState<Sess[]>([])
  const [editHolidayReason, setEditHolidayReason] = useState('')
  const [blockFrom, setBlockFrom] = useState('01:00 م')
  const [blockTo, setBlockTo] = useState('03:00 م')
  const [holidayRangeType, setHolidayRangeType] = useState<'single' | 'range'>('single')

  const isInWindow = (d: Date) => d >= TODAY && d <= WIN_END
  const isPast = (d: Date) => d < TODAY

  const getDayStatus = (key: string, d: Date): DayStatus => {
    const ov = overrides[key]
    if (ov) return ov.status
    if (isPast(d)) return weeklyDefault(getDow(d)).status
    return weeklyDefault(getDow(d)).status
  }

  const getInfo = () => {
    if (!selectedKey) return null
    const parts = selectedKey.split('-').map(Number)
    const d = new Date(parts[0], parts[1]-1, parts[2])
    const dow = getDow(d)
    const ov = overrides[selectedKey]
    const status = getDayStatus(selectedKey, d)
    const sessions: Sess[] = ov?.sessions ?? weeklyDefault(dow).sessions
    return {
      d, dow,
      dayName: ARABIC_DAYS[dow],
      monthName: ARABIC_MONTHS[d.getMonth()],
      day: d.getDate(), year: d.getFullYear(),
      status, sessions,
      hasOverride: !!ov,
      bookings: MOCK_BOOKINGS[selectedKey] || [],
      partialBlock: ov?.partialBlock,
      inWindow: isInWindow(d),
    }
  }

  const openEditor = () => {
    const info = getInfo()
    if (!info) return
    setEditStatus(info.status === 'ممتلئ' || info.status === 'غير معد' || info.status === 'انتهت نافذة الحجز' ? 'متاح' : (info.status as 'متاح' | 'مغلق' | 'إجازة'))
    setEditSessions(info.sessions.map(s => ({...s})))
    setEditHolidayReason(overrides[selectedKey!]?.holidayReason ?? '')
    setActiveSheet('day-editor')
  }

  const saveEdit = () => {
    if (!selectedKey) return
    const bookings = MOCK_BOOKINGS[selectedKey] || []
    if (editStatus !== 'متاح' && bookings.length > 0) { setActiveSheet('conflict'); return }
    setOverrides(p => ({ ...p, [selectedKey]: { status: editStatus, sessions: editStatus === 'متاح' ? editSessions : [], holidayReason: editStatus === 'إجازة' ? editHolidayReason : undefined } }))
    setActiveSheet(null); setHasUnsaved(true)
  }

  const saveBlock = () => {
    if (!selectedKey) return
    setOverrides(p => { const ex = p[selectedKey] || { status: 'متاح' as const }; return { ...p, [selectedKey]: { ...ex, partialBlock: { from: blockFrom, to: blockTo } } } })
    setActiveSheet(null); setHasUnsaved(true)
  }

  const restoreWeekly = () => {
    if (!selectedKey) return
    setOverrides(p => { const n = {...p}; delete n[selectedKey]; return n })
    setActiveSheet(null); setHasUnsaved(true)
  }

  const addSession = () => {
    setEditSessions(p => [...p, { id: `ns${Date.now()}`, from: '17:00', to: '20:00', duration: 30 }])
  }
  const removeSession = (id: string) => setEditSessions(p => p.filter(s => s.id !== id))

  // Build calendar grid
  const daysInMonth = new Date(2026, viewMonth + 1, 0).getDate()
  const firstDow = getDow(new Date(2026, viewMonth, 1))
  const cells: (null | { d: Date; key: string })[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => { const d = new Date(2026, viewMonth, i+1); return { d, key: fmt(d) } }),
  ]
  const rem = cells.length % 7
  if (rem !== 0) for (let i = 0; i < 7 - rem; i++) { const d = new Date(2026, viewMonth+1, i+1); cells.push({ d, key: fmt(d) }) }

  const STATUS_DOT: Record<string, string> = { 'متاح': 'bg-green-400', 'مغلق': 'bg-red-400', 'إجازة': 'bg-gray-400', 'ممتلئ': 'bg-amber-400', 'غير معد': 'bg-gray-200', 'انتهت نافذة الحجز': 'bg-blue-300' }
  const STATUS_TEXT: Record<string, string> = { 'متاح': 'text-green-700', 'مغلق': 'text-red-500', 'إجازة': 'text-gray-400', 'ممتلئ': 'text-amber-600', 'غير معد': 'text-gray-300', 'انتهت نافذة الحجز': 'text-blue-400' }
  const STATUS_BADGE: Record<string, string> = { 'متاح': 'success', 'مغلق': 'error', 'إجازة': 'gray', 'ممتلئ': 'warning', 'غير معد': 'gray', 'انتهت نافذة الحجز': 'gray' }
  const vMonth = ARABIC_MONTHS[viewMonth]
  const info = getInfo()

  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-hidden relative">
      {/* Header */}
      <div className="bg-teal-primary flex-shrink-0">
        <StatusBar dark />
        <div className="flex items-center px-4 py-3 gap-2">
          <button onClick={() => nav('weekly-schedule')} className="w-9 h-9 flex items-center justify-center text-white">
            <IcChevronRight c="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center text-[16px] font-bold text-white">الأيام الـ30 القادمة</h1>
          <button onClick={() => { setSelectedKey(todayKey); if (new Date(2026, viewMonth, 1) > TODAY || new Date(2026, viewMonth+1, 0) < TODAY) setViewMonth(8) }} className="text-white/80 text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/30">اليوم</button>
        </div>
        <div className="px-5 pb-3 flex items-center gap-1.5">
          <IcMapPin c="w-3.5 h-3.5 text-white/60" />
          <p className="text-white/60 text-[11px]">مركز المدينة الطبي · عدن – المنصورة</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Month nav */}
        <div className="bg-white border-b border-[#E8F0F0] px-4 py-2.5 flex items-center justify-between">
          <button onClick={() => setViewMonth(m => Math.min(9, m+1))} className="w-8 h-8 rounded-lg bg-[#F0F4F4] flex items-center justify-center">
            <IcChevronLeft c="w-4 h-4 text-[#374040]" />
          </button>
          <p className="text-[14px] font-bold text-[#1A2424]">{vMonth}{viewMonth === 8 ? ' – أكتوبر' : ''} 2026</p>
          <button onClick={() => setViewMonth(m => Math.max(8, m-1))} className="w-8 h-8 rounded-lg bg-[#F0F4F4] flex items-center justify-center">
            <IcChevronRight c="w-4 h-4 text-[#374040]" />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="bg-white px-2 pt-2 pb-2 border-b border-[#E8F0F0]">
          {/* Day headers: RTL order — first DOM = rightmost visual = السبت */}
          <div className="grid grid-cols-7 mb-1">
            {['س','أ','إ','ث','أ','خ','ج'].map((h, i) => (
              <div key={i} className="text-center text-[10px] font-bold text-[#8A9E9E] py-1">{h}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((cell, i) => {
              if (!cell) return <div key={`e${i}`} className="aspect-square" />
              const isToday = cell.key === todayKey
              const isSelected = cell.key === selectedKey
              const inWindow = isInWindow(cell.d)
              const inPast = isPast(cell.d)
              const outOfMonth = cell.d.getMonth() !== viewMonth
              const status = getDayStatus(cell.key, cell.d)
              const hasOv = !!overrides[cell.key]
              const bookingCount = (MOCK_BOOKINGS[cell.key] || []).length

              return (
                <button
                  key={cell.key}
                  onClick={() => inWindow && setSelectedKey(cell.key)}
                  disabled={!inWindow}
                  className={cn(
                    'aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all select-none',
                    (outOfMonth || inPast) && 'opacity-30',
                    !inWindow && 'cursor-default',
                    isSelected && 'ring-2 ring-teal-primary ring-offset-[1px] bg-teal-50',
                    isToday && !isSelected && 'bg-teal-50',
                  )}
                >
                  {isToday && <span className="absolute top-0.5 text-[6px] font-extrabold text-teal-primary leading-none">●</span>}
                  {hasOv && inWindow && !outOfMonth && (
                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-teal-400 border border-white" />
                  )}
                  <span className={cn('text-[12px] font-bold', inWindow && !outOfMonth ? STATUS_TEXT[status] : 'text-gray-300', isSelected && 'text-teal-700')}>
                    {cell.d.getDate()}
                  </span>
                  {inWindow && !outOfMonth && (
                    <span className={cn('w-1.5 h-1.5 rounded-full mt-0.5', STATUS_DOT[status])} />
                  )}
                  {bookingCount > 0 && inWindow && !outOfMonth && (
                    <span className="text-[8px] font-bold text-[#8A9E9E] leading-none">{bookingCount}</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white px-4 py-2 border-b border-[#E8F0F0]">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {[
              { label: 'متاح', dot: 'bg-green-400' },
              { label: 'مغلق', dot: 'bg-red-400' },
              { label: 'إجازة', dot: 'bg-gray-400' },
              { label: 'ممتلئ', dot: 'bg-amber-400' },
              { label: 'غير معد', dot: 'bg-gray-200 border border-gray-300' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1">
                <span className={cn('w-2 h-2 rounded-full flex-shrink-0', l.dot)} />
                <span className="text-[10px] text-[#8A9E9E]">{l.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
              <span className="text-[10px] text-[#8A9E9E]">تعديل خاص</span>
            </div>
          </div>
        </div>

        {/* Selected day panel */}
        {info ? (
          <div className="px-4 pt-4 pb-40 flex flex-col gap-3">
            {/* Day card */}
            <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm overflow-hidden">
              {/* Card header */}
              <div className="px-4 py-3 border-b border-[#E8F0F0]">
                <div className="flex items-center justify-between mb-1">
                  <Badge label={info.status} variant={STATUS_BADGE[info.status] as any} />
                  <p className="text-[15px] font-bold text-[#1A2424]">{info.dayName}، {info.day} {info.monthName}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className={cn('text-[11px] font-semibold', info.hasOverride ? 'text-teal-600' : 'text-[#8A9E9E]')}>
                    {info.hasOverride ? '✦ لديه تعديل خاص بهذا اليوم' : 'يتبع الجدول الأسبوعي'}
                  </p>
                  {info.bookings.length > 0 && (
                    <p className="text-[11px] text-[#8A9E9E]">{info.bookings.length} حجوزات</p>
                  )}
                </div>
              </div>

              {/* Sessions */}
              {(info.status === 'متاح' || info.status === 'ممتلئ') && info.sessions.length > 0 && (
                <div className="px-4 py-3 border-b border-[#E8F0F0]">
                  <p className="text-[11px] font-bold text-[#8A9E9E] mb-2 text-right">الجلسات</p>
                  {info.sessions.map((s) => (
                    <div key={s.id} className="text-right py-1.5 border-b border-[#F0F4F4] last:border-0">
                      <p className="text-[13px] font-semibold text-[#1A2424]">{formatT(s.from)} – {formatT(s.to)}</p>
                      <p className="text-[11px] text-[#8A9E9E]">مدة الاستشارة: {s.duration} دقيقة · {slotCount(s)} موعد ممكن · أول موعد {formatT(s.from)}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Not configured */}
              {info.status === 'غير معد' && (
                <div className="px-4 py-3 border-b border-[#E8F0F0] text-right">
                  <p className="text-[13px] text-[#8A9E9E]">لا توجد جلسات مهيأة لهذا اليوم.</p>
                </div>
              )}

              {/* Closed */}
              {info.status === 'مغلق' && (
                <div className="px-4 py-3 border-b border-[#E8F0F0] text-right">
                  <p className="text-[13px] text-[#8A9E9E]">هذا اليوم مغلق ولا يقبل حجوزات جديدة.</p>
                </div>
              )}

              {/* Holiday */}
              {info.status === 'إجازة' && (
                <div className="px-4 py-3 border-b border-[#E8F0F0] text-right">
                  <p className="text-[13px] text-[#8A9E9E]">يوم إجازة{overrides[selectedKey!]?.holidayReason ? ` · ${overrides[selectedKey!]?.holidayReason}` : ''}.</p>
                </div>
              )}

              {/* Partial block */}
              {info.partialBlock && (
                <div className="px-4 py-2.5 border-b border-[#E8F0F0] bg-amber-50 flex items-center justify-between">
                  <p className="text-[12px] text-amber-700 font-semibold">{info.partialBlock.from} – {info.partialBlock.to}</p>
                  <p className="text-[11px] font-bold text-amber-600">حظر جزئي</p>
                </div>
              )}

              {/* Bookings */}
              {info.bookings.length > 0 && (
                <div className="px-4 py-3 border-b border-[#E8F0F0]">
                  <p className="text-[11px] font-bold text-[#8A9E9E] mb-2 text-right">الحجوزات</p>
                  {info.bookings.slice(0, 3).map((b, i) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <p className="text-[11px] text-[#8A9E9E]">{b.service}</p>
                      <p className="text-[12px] font-semibold text-[#1A2424]">{b.time} — {b.name}</p>
                    </div>
                  ))}
                  <button onClick={() => nav('bookings')} className="mt-2 w-full text-right text-teal-primary text-[12px] font-semibold">
                    عرض جميع حجوزات اليوم ←
                  </button>
                </div>
              )}

              {/* Actions */}
              {info.inWindow && (
                <div className="px-4 py-3 flex flex-col gap-2">
                  <Btn onClick={openEditor}>
                    تعديل هذا اليوم
                  </Btn>
                  {info.status === 'متاح' && (
                    <Btn variant="secondary" onClick={() => setActiveSheet('partial-block')}>
                      حظر جزء من اليوم
                    </Btn>
                  )}
                  {info.hasOverride && (
                    <button onClick={() => setActiveSheet('restore-confirm')} className="py-2.5 rounded-xl border border-amber-200 text-amber-600 text-[13px] font-semibold bg-amber-50 transition-colors">
                      استعادة الجدول الأسبوعي
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Holiday & Block range card */}
            <button onClick={() => setActiveSheet('holiday-range')} className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm p-4 flex items-center justify-between text-right w-full">
              <IcChevronLeft c="w-4 h-4 text-[#8A9E9E]" />
              <div>
                <p className="text-[13px] font-semibold text-[#1A2424]">الإجازات والحظر</p>
                <p className="text-[11px] text-[#8A9E9E]">تعيين إجازة ليوم أو لفترة متعددة الأيام</p>
              </div>
            </button>
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-[#8A9E9E] text-[13px]">اختر يومًا من التقويم</div>
        )}
      </div>

      {/* Unsaved banner */}
      {hasUnsaved && (
        <div className="absolute bottom-0 left-0 right-0 bg-[#1A2424] px-4 py-3 flex items-center gap-3 z-10">
          <div className="flex gap-2">
            <button onClick={() => setHasUnsaved(false)} className="px-3 py-2 rounded-xl border border-white/20 text-white/70 text-[12px] font-semibold">تجاهل</button>
            <button onClick={() => setHasUnsaved(false)} className="px-3 py-2 rounded-xl bg-teal-primary text-white text-[12px] font-semibold">حفظ التغييرات</button>
          </div>
          <p className="flex-1 text-white text-[12px] font-semibold text-right">لديك تغييرات غير محفوظة</p>
        </div>
      )}

      {/* ── Sheets ── */}
      {activeSheet && (
        <div className="absolute inset-0 bg-black/40 z-20 flex flex-col justify-end" onClick={() => setActiveSheet(null)}>
          <div className="bg-white rounded-t-3xl max-h-[85%] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>

            {/* Day Editor Sheet */}
            {activeSheet === 'day-editor' && info && (
              <>
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <button onClick={() => setActiveSheet(null)} className="text-[#8A9E9E] text-[13px]">إلغاء</button>
                  <h2 className="text-[15px] font-bold text-[#1A2424]">تعديل {info.dayName} {info.day} {info.monthName}</h2>
                  <div className="w-10" />
                </div>
                <div className="px-5 pb-2">
                  <p className="text-[11px] text-[#8A9E9E] text-right bg-teal-50 rounded-xl px-3 py-2">هذا التعديل يخص هذا التاريخ فقط ولن يغيّر جدول {info.dayName} الأسبوعي.</p>
                </div>
                <div className="overflow-y-auto flex-1 px-5 pb-5 flex flex-col gap-4">
                  {/* Status selector */}
                  <div>
                    <p className="text-[12px] font-bold text-[#8A9E9E] mb-2 text-right">حالة اليوم</p>
                    <div className="flex gap-2">
                      {(['متاح', 'مغلق', 'إجازة'] as const).map(s => (
                        <button key={s} onClick={() => setEditStatus(s)}
                          className={cn('flex-1 py-2.5 rounded-xl border text-[13px] font-semibold transition-all',
                            editStatus === s ? 'bg-teal-primary text-white border-teal-primary' : 'bg-white text-[#374040] border-[#E0EDED]')}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sessions if متاح */}
                  {editStatus === 'متاح' && (
                    <div>
                      <p className="text-[12px] font-bold text-[#8A9E9E] mb-2 text-right">الجلسات</p>
                      {editSessions.map((s, i) => (
                        <div key={s.id} className="bg-[#F8FAFA] rounded-xl p-3 mb-2 flex items-center justify-between">
                          <button onClick={() => removeSession(s.id)} className="text-red-400 text-[11px] font-semibold">حذف</button>
                          <div className="text-right">
                            <p className="text-[13px] font-semibold text-[#1A2424]">{formatT(s.from)} – {formatT(s.to)}</p>
                            <p className="text-[11px] text-[#8A9E9E]">{s.duration} دقيقة · {slotCount(s)} موعد</p>
                          </div>
                        </div>
                      ))}
                      <button onClick={addSession} className="w-full py-2.5 rounded-xl border border-dashed border-teal-300 text-teal-primary text-[13px] font-semibold flex items-center justify-center gap-1">
                        <IcPlus c="w-4 h-4" /> إضافة جلسة
                      </button>
                    </div>
                  )}

                  {/* Holiday reason */}
                  {editStatus === 'إجازة' && (
                    <div>
                      <p className="text-[12px] font-bold text-[#8A9E9E] mb-2 text-right">سبب الإجازة (اختياري)</p>
                      <input value={editHolidayReason} onChange={e => setEditHolidayReason(e.target.value)}
                        placeholder="مثال: إجازة شخصية" dir="rtl"
                        className="w-full border border-[#E0EDED] rounded-xl px-4 py-3 text-[13px] text-[#1A2424] outline-none focus:border-teal-primary bg-[#F8FAFA]" />
                    </div>
                  )}

                  {/* Closed note */}
                  {editStatus === 'مغلق' && (
                    <div className="bg-red-50 rounded-xl p-3 text-right">
                      <p className="text-[12px] text-red-600">لن يكون هذا اليوم متاحًا للحجوزات الجديدة.</p>
                      <p className="text-[11px] text-red-400 mt-1">الحجوزات الموجودة محمية ولن تتأثر.</p>
                    </div>
                  )}

                  <Btn onClick={saveEdit}>حفظ التعديل</Btn>
                </div>
              </>
            )}

            {/* Partial Block Sheet */}
            {activeSheet === 'partial-block' && info && (
              <>
                <div className="flex items-center justify-between px-5 pt-5 pb-4">
                  <button onClick={() => setActiveSheet(null)} className="text-[#8A9E9E] text-[13px]">إلغاء</button>
                  <h2 className="text-[15px] font-bold text-[#1A2424]">حظر جزء من {info.dayName} {info.day} {info.monthName}</h2>
                  <div className="w-10" />
                </div>
                <div className="px-5 pb-6 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-[#8A9E9E] mb-1.5 text-right">إلى</p>
                      <select value={blockTo} onChange={e => setBlockTo(e.target.value)} dir="rtl"
                        className="w-full border border-[#E0EDED] rounded-xl px-3 py-3 text-[13px] text-[#1A2424] bg-[#F8FAFA] outline-none">
                        {['12:00 م','01:00 م','02:00 م','03:00 م','04:00 م','05:00 م'].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-[#8A9E9E] mb-1.5 text-right">من</p>
                      <select value={blockFrom} onChange={e => setBlockFrom(e.target.value)} dir="rtl"
                        className="w-full border border-[#E0EDED] rounded-xl px-3 py-3 text-[13px] text-[#1A2424] bg-[#F8FAFA] outline-none">
                        {['11:00 ص','12:00 م','01:00 م','02:00 م','03:00 م','04:00 م'].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3 text-right">
                    <p className="text-[11px] font-bold text-amber-700 mb-0.5">الفترة المحظورة</p>
                    <p className="text-[13px] text-amber-800">{blockFrom} – {blockTo}</p>
                    <p className="text-[11px] text-amber-600 mt-1">لن تُنقل المواعيد الموجودة تلقائيًا.</p>
                  </div>
                  <Btn onClick={saveBlock}>حفظ الحظر</Btn>
                </div>
              </>
            )}

            {/* Holiday Range Sheet */}
            {activeSheet === 'holiday-range' && (
              <>
                <div className="flex items-center justify-between px-5 pt-5 pb-4">
                  <button onClick={() => setActiveSheet(null)} className="text-[#8A9E9E] text-[13px]">إلغاء</button>
                  <h2 className="text-[15px] font-bold text-[#1A2424]">الإجازات والحظر</h2>
                  <div className="w-10" />
                </div>
                <div className="px-5 pb-6 flex flex-col gap-4">
                  <div className="flex gap-2">
                    {(['single', 'range'] as const).map((t) => (
                      <button key={t} onClick={() => setHolidayRangeType(t)}
                        className={cn('flex-1 py-2.5 rounded-xl border text-[13px] font-semibold transition-all',
                          holidayRangeType === t ? 'bg-teal-primary text-white border-teal-primary' : 'bg-white text-[#374040] border-[#E0EDED]')}>
                        {t === 'single' ? 'إجازة ليوم واحد' : 'إجازة لفترة'}
                      </button>
                    ))}
                  </div>
                  {holidayRangeType === 'range' && (
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-[#8A9E9E] mb-1.5 text-right">إلى</p>
                        <input type="date" min="2026-09-09" max="2026-10-08" defaultValue="2026-09-21" dir="ltr"
                          className="w-full border border-[#E0EDED] rounded-xl px-3 py-3 text-[13px] bg-[#F8FAFA] outline-none" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-[#8A9E9E] mb-1.5 text-right">من</p>
                        <input type="date" min="2026-09-09" max="2026-10-08" defaultValue="2026-09-18" dir="ltr"
                          className="w-full border border-[#E0EDED] rounded-xl px-3 py-3 text-[13px] bg-[#F8FAFA] outline-none" />
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-[11px] font-bold text-[#8A9E9E] mb-1.5 text-right">سبب الإجازة (اختياري)</p>
                    <input placeholder="مثال: إجازة سنوية" dir="rtl"
                      className="w-full border border-[#E0EDED] rounded-xl px-4 py-3 text-[13px] text-[#1A2424] outline-none bg-[#F8FAFA]" />
                  </div>
                  <p className="text-[11px] text-[#8A9E9E] text-right">الحجوزات الموجودة لن تُحذف أو تُنقل تلقائيًا.</p>
                  <Btn onClick={() => { setActiveSheet(null); setHasUnsaved(true) }}>حفظ الإجازة</Btn>
                </div>
              </>
            )}

            {/* Restore Confirm */}
            {activeSheet === 'restore-confirm' && info && (
              <div className="px-5 pt-5 pb-8 flex flex-col gap-4 text-right">
                <h2 className="text-[16px] font-bold text-[#1A2424]">استعادة جدول {info.dayName} الأسبوعي؟</h2>
                <p className="text-[13px] text-[#5A7070] leading-relaxed">سيُحذف التعديل الخاص بهذا التاريخ فقط، وسيعود اليوم إلى الجدول الأسبوعي المعتاد.</p>
                <div className="flex gap-3 mt-2">
                  <Btn onClick={restoreWeekly} className="flex-1">استعادة الجدول</Btn>
                  <Btn variant="secondary" onClick={() => setActiveSheet(null)} className="flex-1">إلغاء</Btn>
                </div>
              </div>
            )}

            {/* Conflict Review */}
            {activeSheet === 'conflict' && info && (
              <div className="px-5 pt-5 pb-8 flex flex-col gap-4 text-right">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-lg">!</span>
                  <h2 className="text-[16px] font-bold text-[#1A2424]">توجد حجوزات متأثرة</h2>
                </div>
                <p className="text-[13px] text-[#5A7070]">هذا التغيير يتعارض مع {info.bookings.length} حجوزات موجودة.</p>
                <div className="bg-[#F8FAFA] rounded-xl overflow-hidden">
                  {info.bookings.map((b, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-[#E8F0F0] last:border-0">
                      <p className="text-[12px] text-[#8A9E9E]">{b.service}</p>
                      <div className="text-right">
                        <p className="text-[13px] font-semibold text-[#1A2424]">{b.name}</p>
                        <p className="text-[11px] text-[#8A9E9E]">{b.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-red-50 rounded-xl p-3">
                  <p className="text-[12px] text-red-700 font-semibold">لن يتم إلغاء أو نقل أي حجز تلقائيًا.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Btn variant="secondary" onClick={() => nav('bookings')}>عرض الحجوزات المتأثرة</Btn>
                  <Btn onClick={() => setActiveSheet('day-editor')}>العودة لتعديل الجدول</Btn>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}

// ── Session Editor ─────────────────────────────────────────────────────

function SessionEditorScreen({ nav }: { nav: (s: Screen) => void }) {
  const [duration, setDuration] = useState('30')
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3 border-b border-[#E8F0F0]">
        <button onClick={() => nav('schedule-30day')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">إضافة جلسة جديدة</h1>
        <div className="w-9" />
      </div>
      <div className="flex-1 px-5 py-5 flex flex-col gap-5">
        <InputField label="اسم الجلسة" placeholder="مثال: استشارة عامة" />
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-[13px] font-semibold text-[#374040] block mb-1.5">وقت البداية</label>
            <div className="relative">
              <IcClock c="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B0C4C4]" />
              <input type="time" defaultValue="08:00" className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl pr-10 pl-4 py-3.5 text-[14px] focus:outline-none focus:border-teal-primary" />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-[13px] font-semibold text-[#374040] block mb-1.5">وقت النهاية</label>
            <div className="relative">
              <IcClock c="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B0C4C4]" />
              <input type="time" defaultValue="13:00" className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl pr-10 pl-4 py-3.5 text-[14px] focus:outline-none focus:border-teal-primary" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#374040]">مدة الاستشارة</label>
          <div className="flex items-center bg-[#F8FAFA] border border-[#E0EDED] rounded-xl overflow-hidden">
            <select value={duration} onChange={e => setDuration(e.target.value)} className="flex-1 bg-transparent px-4 py-3.5 text-[14px] text-[#1A2424] focus:outline-none">
              {['10', '15', '20', '30', '45', '60'].map(d => (
                <option key={d} value={d}>{d} دقيقة</option>
              ))}
            </select>
          </div>
        </div>
        {/* Session summary */}
        <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100">
          <div className="flex items-center gap-2 mb-3">
            <IcCalendar c="w-4 h-4 text-teal-primary" />
            <p className="text-[13px] font-bold text-teal-primary">ملخص الجلسة</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'اليوم', val: 'الأحد، 12 يوليو 2023' },
              { label: 'الوقت', val: '08:00 ص – 13:00 ص' },
              { label: 'مدة الاستشارة', val: `${duration} دقيقة` },
              { label: 'أول موعد', val: '08:00 ص' },
              { label: 'آخر بداية موعد', val: '12:30 ص' },
            ].map(r => (
              <div key={r.label}>
                <p className="text-[11px] text-[#8A9E9E]">{r.label}</p>
                <p className="text-[12px] font-semibold text-[#374040]">{r.val}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <Btn onClick={() => nav('schedule-30day')}>حفظ الجلسة</Btn>
        </div>
      </div>
    </div>
  )
}

// ── Holiday / Block ────────────────────────────────────────────────────

function HolidayBlockScreen({ nav }: { nav: (s: Screen) => void }) {
  const [type, setType] = useState<'single' | 'range' | 'partial'>('single')
  const [tab, setTab] = useState<'add' | 'list'>('add')
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3 border-b border-[#E8F0F0]">
        <button onClick={() => nav('schedule-30day')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">الإجازات والحجب الجزئي</h1>
        <div className="w-9" />
      </div>
      {/* Sub tabs */}
      <div className="flex bg-[#F0F4F4] m-4 rounded-xl p-1">
        {[{ id: 'add', l: 'إضافة جديدة' }, { id: 'list', l: 'قائمة الإجازات' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} className={cn('flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all', tab === t.id ? 'bg-white text-teal-primary shadow-sm' : 'text-[#8A9E9E]')}>
            {t.l}
          </button>
        ))}
      </div>
      {tab === 'add' ? (
        <div className="flex-1 px-5 flex flex-col gap-5 pb-6">
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-bold text-[#374040]">نوع الإجراء</p>
            {[
              { id: 'single', label: 'إجازة ليوم واحد', sub: 'أغلق يوماً بأكمله' },
              { id: 'range', label: 'إجازة لفترة', sub: 'أغلق عدة أيام متتالية' },
              { id: 'partial', label: 'حجب جزئي خلال اليوم', sub: 'حجب ساعات معينة فقط' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setType(opt.id as typeof type)}
                className={cn('flex items-center gap-3 p-4 rounded-xl border-2 text-right transition-all', type === opt.id ? 'border-teal-primary bg-teal-50' : 'border-[#E8F0F0] bg-white')}
              >
                <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0', type === opt.id ? 'border-teal-primary' : 'border-[#D0D8D8]')}>
                  {type === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-teal-primary" />}
                </div>
                <div>
                  <p className={cn('text-[13px] font-semibold', type === opt.id ? 'text-teal-primary' : 'text-[#1A2424]')}>{opt.label}</p>
                  <p className="text-[11px] text-[#8A9E9E] mt-0.5">{opt.sub}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#374040]">التاريخ</label>
            <input type="date" defaultValue="2023-07-12" className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:border-teal-primary" />
          </div>
          {type === 'partial' && (
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[13px] font-semibold text-[#374040] block mb-1.5">من</label>
                <input type="time" className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:border-teal-primary" />
              </div>
              <div className="flex-1">
                <label className="text-[13px] font-semibold text-[#374040] block mb-1.5">إلى</label>
                <input type="time" className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:border-teal-primary" />
              </div>
            </div>
          )}
          <InputField label="ملاحظات (اختياري)" placeholder="مثال: إجازة سنوية" />
          <Btn onClick={() => nav('schedule-30day')}>إضافة</Btn>
        </div>
      ) : (
        <div className="flex-1 px-4 flex flex-col gap-3 pb-6">
          {[
            { date: '18 يوليو 2023', type: 'إجازة كاملة', note: 'إجازة سنوية' },
            { date: '25–28 يوليو 2023', type: 'إجازة لفترة', note: 'رحلة عمل' },
          ].map((h, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm flex items-center justify-between">
              <button className="text-[12px] text-red-500 font-semibold">حذف</button>
              <div className="text-right">
                <p className="text-[13px] font-bold text-[#1A2424]">{h.date}</p>
                <div className="flex items-center gap-2 mt-1 justify-end">
                  <p className="text-[12px] text-[#8A9E9E]">{h.note}</p>
                  <Badge label={h.type} variant="gray" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Confirmation Policy ────────────────────────────────────────────────

function ConfirmationPolicyScreen({ nav }: { nav: (s: Screen) => void }) {
  const [policy, setPolicy] = useState<'instant' | 'center'>('instant')
  const [centerTime, setCenterTime] = useState<'anytime' | 'specific' | 'range'>('anytime')
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3 border-b border-[#E8F0F0]">
        <button onClick={() => nav('work-location-overview')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">سياسة تأكيد الحجز</h1>
        <div className="w-9" />
      </div>
      <div className="flex-1 px-5 py-5 flex flex-col gap-5">
        <div>
          <p className="text-[13px] font-bold text-[#5A7070] mb-3">طريقة تأكيد الحجز</p>
          <div className="flex flex-col gap-2">
            {[
              { id: 'instant', icon: '⚡', label: 'تأكيد فوري', sub: 'يتم تأكيد المواعيد الجديدة مباشرة عند الحجز' },
              { id: 'center', icon: '🏥', label: 'تأكيد من المركز', sub: 'تتطلب موافقة من المركز قبل تأكيد الحجز' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setPolicy(opt.id as typeof policy)}
                className={cn('flex items-center gap-3 p-4 rounded-2xl border-2 text-right transition-all', policy === opt.id ? 'border-teal-primary bg-teal-50' : 'border-[#E8F0F0]')}
              >
                <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0', policy === opt.id ? 'border-teal-primary' : 'border-[#D0D8D8]')}>
                  {policy === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-teal-primary" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span>{opt.icon}</span>
                    <p className={cn('text-[14px] font-bold', policy === opt.id ? 'text-teal-primary' : 'text-[#1A2424]')}>{opt.label}</p>
                  </div>
                  <p className="text-[12px] text-[#8A9E9E] mt-1">{opt.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        {policy === 'center' && (
          <div className="bg-teal-50 rounded-2xl p-4">
            <p className="text-[13px] font-bold text-teal-primary mb-3">وقت تأكيد الحجز في المركز</p>
            <div className="flex flex-col gap-2">
              {[
                { id: 'anytime', label: 'في أي وقت قبل الموعد' },
                { id: 'specific', label: 'في وقت محدد' },
                { id: 'range', label: 'خلال فترة زمنية' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setCenterTime(opt.id as typeof centerTime)}
                  className={cn('flex items-center gap-3 py-2.5 px-3 rounded-xl border text-right transition-all', centerTime === opt.id ? 'border-teal-primary bg-white' : 'border-transparent bg-white/60')}
                >
                  <div className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0', centerTime === opt.id ? 'border-teal-primary' : 'border-[#D0D8D8]')}>
                    {centerTime === opt.id && <div className="w-2 h-2 rounded-full bg-teal-primary" />}
                  </div>
                  <p className="text-[13px] font-semibold text-[#374040]">{opt.label}</p>
                </button>
              ))}
            </div>
            {centerTime === 'specific' && (
              <div className="mt-3">
                <input type="time" defaultValue="09:00" className="w-full bg-white border border-[#E0EDED] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-teal-primary" />
              </div>
            )}
            {centerTime === 'range' && (
              <div className="flex gap-3 mt-3">
                <div className="flex-1">
                  <p className="text-[11px] text-[#8A9E9E] mb-1">من</p>
                  <input type="time" defaultValue="08:00" className="w-full bg-white border border-[#E0EDED] rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:border-teal-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-[#8A9E9E] mb-1">إلى</p>
                  <input type="time" defaultValue="10:00" className="w-full bg-white border border-[#E0EDED] rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:border-teal-primary" />
                </div>
              </div>
            )}
          </div>
        )}
        <p className="text-[13px] font-bold text-[#5A7070]">تأكيد الحضور من قبل المريض</p>
        <div className="flex items-center justify-between py-3 px-4 bg-[#F8FAFA] rounded-xl">
          <IcClock c="w-4 h-4 text-[#8A9E9E]" />
          <p className="text-[13px] text-[#374040] flex-1 px-3">24 ساعة قبل موعد الجلسة</p>
        </div>
        <div className="mt-auto">
          <Btn onClick={() => nav('work-location-overview')}>حفظ الإعدادات</Btn>
        </div>
      </div>
    </div>
  )
}

// ── Services & Prices ──────────────────────────────────────────────────

function ServicesPricesScreen({ nav }: { nav: (s: Screen) => void }) {
  const services = [
    { name: 'استشارة عامة', duration: '30 دقيقة', price: '15,000 ر.ي', type: 'استشارة' },
    { name: 'متابعة', duration: '20 دقيقة', price: '10,000 ر.ي', type: 'متابعة' },
    { name: 'استشارة مطولة', duration: '45 دقيقة', price: '35,000 ر.ي', type: 'إجراء' },
    { name: 'استشارة تخصصية', duration: '30 دقيقة', price: '25,000 ر.ي', type: 'استشارة' },
  ]
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <div className="flex items-center px-4 py-3 gap-3">
          <button onClick={() => nav('work-location-overview')} className="w-9 h-9 flex items-center justify-center text-white">
            <IcChevronRight c="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center text-[17px] font-bold text-white">الخدمات والأسعار</h1>
          <button className="w-9 h-9 flex items-center justify-center text-white">
            <IcPlus c="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 px-4 pt-4 flex flex-col gap-3">
        {services.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm">
            <div className="flex items-center justify-between w-full">
              <div className="text-right">
                <p className="text-[14px] font-bold text-[#1A2424]">{s.name}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[13px] font-bold text-teal-primary">{s.price}</span>
                  <span className="text-[12px] text-[#8A9E9E] flex items-center gap-1"><IcClock c="w-3.5 h-3.5" />{s.duration}</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <Badge label={s.type} variant="default" />
                <button className="text-[12px] text-teal-primary font-semibold">تعديل</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-5">
        <Btn><IcPlus c="w-5 h-5" />إضافة خدمة جديدة</Btn>
      </div>
    </div>
  )
}

// ── Bookings ───────────────────────────────────────────────────────────

function BookingsScreen({ nav }: { nav: (s: Screen) => void }) {
  const [selectedDate, setSelectedDate] = useState(8)
  const [filter, setFilter] = useState('الكل')
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sheetStatus, setSheetStatus] = useState<string[]>([])
  const [sheetPayment, setSheetPayment] = useState<string[]>([])
  const dateRow = [6, 7, 8, 9, 10, 11, 12]
  const dayNames = ['ج', 'س', 'أ', 'إ', 'ث', 'أ', 'خ']
  const bookings = [
    { time: '09:00 ص', name: 'محمد عبدالله', service: 'استشارة عامة', status: 'قيد الانتظار', statusV: 'warning', fee: '15,000 ر.ي', payment: 'عند الزيارة' },
    { time: '09:30 ص', name: 'أحمد علي', service: 'استشارة تخصصية', status: 'مؤكد', statusV: 'teal', fee: '25,000 ر.ي', payment: 'عند الزيارة' },
    { time: '10:30 ص', name: 'سارة محمد', service: 'متابعة', status: 'مؤكد', statusV: 'teal', fee: '10,000 ر.ي', payment: 'عند الزيارة' },
    { time: '11:15 ص', name: 'خالد سالم', service: 'استشارة عامة', status: 'قيد الانتظار', statusV: 'warning', fee: '15,000 ر.ي', payment: 'عند الزيارة' },
    { time: '02:00 م', name: 'نورة علي', service: 'استشارة عامة', status: 'مكتمل', statusV: 'success', fee: '15,000 ر.ي', payment: 'عند الزيارة' },
  ]
  const statusFilters = ['الكل', 'قيد الانتظار', 'مؤكد', 'مكتمل', 'ملغي']
  const filtered = filter === 'الكل' ? bookings : bookings.filter(b => b.status === filter)
  const applyFilters = () => {
    const chips: string[] = [...sheetStatus, ...sheetPayment]
    setActiveFilters(chips)
    setShowFilterSheet(false)
  }
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-hidden relative">
      <div className="flex-1 overflow-y-auto">
        <div className="bg-teal-primary">
          <StatusBar dark />
          <div className="flex items-center px-4 py-3 gap-3">
            <button onClick={() => nav('home')} className="w-9 h-9 flex items-center justify-center text-white">
              <IcChevronRight c="w-5 h-5" />
            </button>
            <h1 className="flex-1 text-center text-[17px] font-bold text-white">الحجوزات</h1>
            <div className="w-9" />
          </div>
          <div className="px-5 pb-3">
            <button className="flex items-center gap-2 text-white/80 text-[13px]">
              <IcMapPin c="w-4 h-4" />
              <span>مركز المدينة الطبي · عدن – المنصورة</span>
              <IcChevronLeft c="w-4 h-4" />
            </button>
          </div>
          <div className="px-5 pb-4 flex gap-2">
            {[{ l: 'الإجمالي', v: '12' }, { l: 'انتظار', v: '4' }, { l: 'مؤكد', v: '6' }, { l: 'مكتمل', v: '2' }].map(c => (
              <div key={c.l} className="bg-white/15 rounded-xl px-3 py-2 flex flex-col items-center min-w-[56px]">
                <span className="text-[16px] font-extrabold text-white">{c.v}</span>
                <span className="text-[10px] font-semibold text-white/70">{c.l}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Date strip */}
        <div className="bg-white px-4 py-3 border-b border-[#E8F0F0]">
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center">
              <IcChevronRight c="w-4 h-4 text-[#8A9E9E]" />
            </button>
            {dateRow.map((d, i) => (
              <button key={d} onClick={() => setSelectedDate(d)}
                className={cn('flex-1 flex flex-col items-center py-2 rounded-xl transition-all', d === selectedDate ? 'bg-teal-primary' : 'hover:bg-teal-50')}>
                <span className={cn('text-[10px] font-semibold', d === selectedDate ? 'text-white/70' : 'text-[#B0C4C4]')}>{dayNames[i]}</span>
                <span className={cn('text-[14px] font-bold', d === selectedDate ? 'text-white' : 'text-[#374040]')}>{d}</span>
              </button>
            ))}
            <button className="w-7 h-7 flex items-center justify-center">
              <IcChevronLeft c="w-4 h-4 text-[#8A9E9E]" />
            </button>
          </div>
        </div>
        {/* Search & filter */}
        <div className="px-4 pt-3 pb-2 flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white border border-[#E8F0F0] rounded-xl px-3 py-2.5 shadow-sm">
            <IcSearch c="w-4 h-4 text-[#B0C4C4]" />
            <input placeholder="ابحث باسم المريض أو رقم الحجز" className="flex-1 bg-transparent text-[12px] text-[#1A2424] placeholder:text-[#B0C4C4] focus:outline-none text-right" />
          </div>
          <button onClick={() => setShowFilterSheet(true)} className="relative flex items-center gap-1.5 bg-white border border-[#E8F0F0] rounded-xl px-3 py-2.5 shadow-sm">
            <IcFilter c="w-4 h-4 text-[#374040]" />
            <span className="text-[12px] font-semibold text-[#374040]">تصفية</span>
            {activeFilters.length > 0 && (
              <span className="absolute -top-1 -left-1 w-4.5 h-4.5 bg-teal-primary rounded-full text-white text-[10px] font-bold flex items-center justify-center">{activeFilters.length}</span>
            )}
          </button>
        </div>
        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
            {activeFilters.map((chip, i) => (
              <span key={i} className="flex-shrink-0 flex items-center gap-1 bg-teal-50 border border-teal-200 text-teal-primary rounded-full px-3 py-1 text-[11px] font-semibold">
                {chip}
                <button onClick={() => setActiveFilters(prev => prev.filter((_, idx) => idx !== i))} className="text-teal-400 font-bold">×</button>
              </span>
            ))}
            <button onClick={() => setActiveFilters([])} className="flex-shrink-0 text-[11px] text-red-500 font-semibold px-2">مسح الكل</button>
          </div>
        )}
        {/* Status quick filter */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto">
          {statusFilters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn('flex-shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all', filter === f ? 'bg-teal-primary text-white' : 'bg-white text-[#5A7070] border border-[#E8F0F0]')}>
              {f}
            </button>
          ))}
        </div>
        {/* Booking list */}
        <div className="px-4 flex flex-col gap-2 pb-4">
          {filtered.map((b, i) => (
            <button key={i} onClick={() => nav('booking-details')}
              className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm flex items-center justify-between w-full">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <IcUser c="w-5 h-5 text-teal-primary" />
                </div>
                <div className="min-w-0 text-right">
                  <p className="text-[13px] font-bold text-[#1A2424]">{b.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <IcClock c="w-3 h-3 text-[#8A9E9E]" />
                    <span className="text-[11px] text-[#8A9E9E]">{b.time}</span>
                    <span className="text-[11px] text-[#B0C4C4]">·</span>
                    <span className="text-[11px] text-[#8A9E9E]">{b.service}</span>
                  </div>
                  <p className="text-[11px] text-[#B0C4C4] mt-0.5">{b.fee}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge label={b.status} variant={b.statusV as 'teal' | 'warning' | 'success' | 'error'} />
                <IcChevronLeft c="w-4 h-4 text-[#B0C4C4]" />
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Filter Bottom Sheet */}
      {showFilterSheet && (
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end z-50" onClick={() => setShowFilterSheet(false)}>
          <div className="bg-white rounded-t-3xl p-5 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <button onClick={() => { setSheetStatus([]); setSheetPayment([]) }} className="text-[13px] text-red-500 font-semibold">إعادة ضبط</button>
              <p className="text-[16px] font-bold text-[#1A2424]">تصفية الحجوزات</p>
              <button onClick={() => setShowFilterSheet(false)} className="text-[#8A9E9E] font-bold text-[18px]">×</button>
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#374040] mb-2 text-right">الحالة</p>
              <div className="flex flex-wrap gap-2">
                {['قيد الانتظار', 'مؤكد', 'تم تسجيل الوصول', 'الزيارة جارية', 'مكتمل', 'ملغي', 'لم يحضر'].map(s => (
                  <button key={s} onClick={() => setSheetStatus(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                    className={cn('px-3 py-1.5 rounded-full text-[12px] font-semibold border', sheetStatus.includes(s) ? 'bg-teal-primary text-white border-teal-primary' : 'bg-[#F8FAFA] text-[#374040] border-[#E0EDED]')}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#374040] mb-2 text-right">طريقة الدفع</p>
              <div className="flex gap-2">
                {['الدفع عند الزيارة', 'الدفع الإلكتروني'].map(s => (
                  <button key={s} onClick={() => setSheetPayment(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                    className={cn('flex-1 py-2 rounded-xl text-[12px] font-semibold border', sheetPayment.includes(s) ? 'bg-teal-primary text-white border-teal-primary' : 'bg-[#F8FAFA] text-[#374040] border-[#E0EDED]')}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#374040] mb-2 text-right">المستفيد</p>
              <div className="flex gap-2">
                {['الكل', 'المريض نفسه', 'أحد أفراد الأسرة'].map((s, i) => (
                  <button key={s} className={cn('flex-1 py-2 rounded-xl text-[12px] font-semibold border', i === 0 ? 'bg-teal-primary text-white border-teal-primary' : 'bg-[#F8FAFA] text-[#374040] border-[#E0EDED]')}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <Btn onClick={applyFilters}>
              تطبيق الفلاتر · عرض {filtered.length} حجوزات
            </Btn>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Booking Details ────────────────────────────────────────────────────

function BookingDetailsScreen({ nav }: { nav: (s: Screen) => void }) {
  type BStatus = 'pending' | 'confirmed' | 'checked-in' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
  const [status, setStatus] = useState<BStatus>('pending')
  const [variant, setVariant] = useState<'normal' | 'family' | 'provider'>('normal')
  const [showNoteSheet, setShowNoteSheet] = useState(false)
  const [showNoShowConfirm, setShowNoShowConfirm] = useState(false)
  const [internalNote, setInternalNote] = useState('')
  const [reminderSent, setReminderSent] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState<string | null>(null)

  const showToast = (msg: string) => { setShowSuccessToast(msg); setTimeout(() => setShowSuccessToast(null), 2500) }

  const statusLabel: Record<BStatus, string> = {
    pending: 'قيد الانتظار', confirmed: 'مؤكد', 'checked-in': 'تم تسجيل الوصول',
    'in-progress': 'الزيارة جارية', completed: 'مكتمل', cancelled: 'ملغي', 'no-show': 'لم يحضر'
  }
  const statusVariant: Record<BStatus, string> = {
    pending: 'warning', confirmed: 'info', 'checked-in': 'success', 'in-progress': 'info',
    completed: 'success', cancelled: 'error', 'no-show': 'error'
  }

  const primaryAction = () => {
    if (status === 'pending') { setStatus('confirmed'); showToast('تم تأكيد الحجز') }
    else if (status === 'confirmed') { setStatus('checked-in'); showToast('تم تسجيل الوصول') }
    else if (status === 'checked-in') { setStatus('in-progress'); showToast('بدأت الزيارة') }
    else if (status === 'in-progress') { setStatus('completed'); showToast('تمت الزيارة بنجاح') }
  }
  const primaryLabels: Partial<Record<BStatus, string>> = { pending: 'تأكيد الحجز', confirmed: 'تسجيل الوصول', 'checked-in': 'بدء الزيارة', 'in-progress': 'إنهاء الزيارة' }
  const primaryLabel = primaryLabels[status]
  const isDone = status === 'completed' || status === 'cancelled' || status === 'no-show'

  const isFamily = variant === 'family'
  const isProvider = variant === 'provider'

  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-hidden relative">
      <StatusBar />
      {/* Header */}
      <div className="bg-white border-b border-[#E8F0F0] flex items-center px-4 py-3 gap-3 flex-shrink-0">
        <button onClick={() => nav('bookings')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">تفاصيل الحجز</h1>
        <button className="w-9 h-9 flex items-center justify-center text-[#374040]">
          <IcDots c="w-5 h-5" />
        </button>
      </div>
      {/* Demo variant switcher */}
      <div className="bg-white border-b border-[#E8F0F0] px-4 py-2 flex gap-1.5 flex-shrink-0">
        {(['normal', 'family', 'provider'] as const).map(v => (
          <button key={v} onClick={() => setVariant(v)}
            className={cn('px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all', variant === v ? 'bg-teal-primary text-white' : 'bg-[#F0F4F4] text-[#8A9E9E]')}>
            {v === 'normal' ? 'عادي' : v === 'family' ? 'حجز عائلي' : 'مُدار بالمركز'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 flex flex-col gap-3">

          {/* Patient card */}
          <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                <IcUser c="w-7 h-7 text-teal-primary" />
              </div>
              <div className="flex-1 text-right">
                <p className="text-[15px] font-bold text-[#1A2424]">محمد عبدالله</p>
                <p className="text-[12px] text-[#8A9E9E]">#7842 · رقم المريض</p>
                <button className="flex items-center gap-1.5 mt-1 text-[12px] text-teal-primary font-semibold">
                  <IcPhone c="w-3.5 h-3.5" />
                  <span>+967 77 123 4567</span>
                </button>
              </div>
            </div>
            {/* Family beneficiary */}
            {isFamily && (
              <div className="mt-3 pt-3 border-t border-teal-200 flex items-center justify-between">
                <Badge label="الابنة" variant="info" />
                <div className="text-right">
                  <p className="text-[11px] text-[#8A9E9E]">الحجز لـ</p>
                  <p className="text-[13px] font-bold text-[#1A2424]">سارة محمد</p>
                </div>
              </div>
            )}
          </div>

          {/* Status & booking info */}
          <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between border-b border-[#E8F0F0]">
              <Badge label={statusLabel[status]} variant={statusVariant[status] as any} />
              <div className="flex items-center gap-1.5">
                <p className="text-[12px] text-[#8A9E9E]">#BK-2026-0917</p>
                <p className="text-[12px] font-bold text-[#8A9E9E]">رقم الحجز</p>
              </div>
            </div>
            {[
              { label: 'التاريخ والوقت', val: 'الخميس، 17 سبتمبر 2026', sub: '09:30 ص — 10:00 ص' },
              { label: 'الخدمة', val: 'استشارة عامة', sub: '30 دقيقة' },
              { label: 'موقع العمل', val: 'مركز المدينة الطبي', sub: 'عدن – المنصورة' },
              { label: 'طريقة الدفع', val: 'الدفع عند الزيارة', sub: '15,000 ر.ي · غير مدفوع' },
            ].map((r, i, arr) => (
              <div key={i}>
                <div className="flex items-center justify-between px-4 py-3">
                  <p className="text-[13px] font-semibold text-[#1A2424]">{r.val}</p>
                  <p className="text-[12px] text-[#8A9E9E]">{r.label}</p>
                </div>
                {r.sub && <p className="text-[11px] text-[#8A9E9E] px-4 pb-2.5">{r.sub}</p>}
                {i < arr.length - 1 && <Divider />}
              </div>
            ))}
          </div>

          {/* Provider-managed notice */}
          {isProvider && (
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-right">
              <p className="text-[13px] font-bold text-amber-800 mb-1">تتم إدارة هذا الحجز بواسطة المركز</p>
              <p className="text-[12px] text-amber-700">بعض الإجراءات كإعادة الجدولة والإلغاء تستلزم التنسيق مع المركز مباشرةً.</p>
            </div>
          )}

          {/* Notes */}
          <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E8F0F0] text-right">
              <p className="text-[12px] font-bold text-[#8A9E9E] mb-1">ملاحظة المريض</p>
              <p className="text-[13px] text-[#5A7070]">لدي ألم مزمن في البطن منذ أسبوعين، أرجو الاستعجال.</p>
            </div>
            <button onClick={() => setShowNoteSheet(true)} className="px-4 py-3 w-full flex items-center justify-between">
              <svg className="w-4 h-4 text-teal-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              <div className="text-right flex-1">
                <p className="text-[12px] font-bold text-[#8A9E9E] mb-0.5">ملاحظة داخلية</p>
                <p className="text-[13px] text-[#5A7070]">{internalNote || 'اضغط لإضافة ملاحظة...'}</p>
              </div>
            </button>
          </div>

          {/* Primary action */}
          {!isDone && !isProvider && primaryLabel && (
            <Btn onClick={primaryAction}>{primaryLabel}</Btn>
          )}
          {isProvider && !isDone && (
            <Btn variant="secondary" onClick={() => showToast('تم إرسال طلب التأكيد للمركز')}>
              طلب تأكيد من المركز
            </Btn>
          )}
          {status === 'completed' && (
            <div className="bg-green-50 rounded-2xl p-4 border border-green-200 text-center">
              <p className="text-[14px] font-bold text-green-700">تمت الزيارة بنجاح ✓</p>
            </div>
          )}

          {/* Secondary actions */}
          {!isDone && (
            <div className="flex gap-2">
              {!isProvider && (
                <Btn variant="secondary" onClick={() => nav('reschedule')} className="flex-1 text-[12px] py-2.5">
                  إعادة الجدولة
                </Btn>
              )}
              {!isProvider && (
                <Btn variant="secondary"
                  className={cn('flex-1 text-[12px] py-2.5', reminderSent && 'text-[#8A9E9E]')}
                  onClick={() => { setReminderSent(true); showToast('تم إرسال التذكير للمريض') }}>
                  {reminderSent ? 'تذكير مُرسَل' : 'إرسال تذكير'}
                </Btn>
              )}
              <Btn variant="destructive" onClick={() => nav('booking-cancel')} className="flex-1 text-[12px] py-2.5">إلغاء</Btn>
            </div>
          )}

          {/* No-show */}
          {(status === 'confirmed' || status === 'checked-in') && (
            <button onClick={() => setShowNoShowConfirm(true)} className="text-[12px] text-red-400 font-semibold text-center py-1">
              تسجيل كـ "لم يحضر"
            </button>
          )}

          {/* Patient controls */}
          <button onClick={() => nav('patient-controls')}
            className="bg-white rounded-2xl border border-[#E8F0F0] px-4 py-3.5 flex items-center justify-between shadow-sm">
            <IcChevronLeft c="w-4 h-4 text-[#B0C4C4]" />
            <div className="text-right">
              <p className="text-[13px] font-semibold text-[#1A2424]">إعدادات المريض</p>
              <p className="text-[11px] text-[#8A9E9E]">التأكيد التلقائي · منع الحجز</p>
            </div>
          </button>
        </div>
      </div>

      {/* Success toast */}
      {showSuccessToast && (
        <div className="absolute top-20 left-4 right-4 bg-[#1A2424] text-white text-[13px] font-semibold rounded-2xl px-4 py-3 text-center shadow-lg z-30">
          {showSuccessToast}
        </div>
      )}

      {/* Internal note sheet */}
      {showNoteSheet && (
        <div className="absolute inset-0 bg-black/40 z-20 flex flex-col justify-end" onClick={() => setShowNoteSheet(false)}>
          <div className="bg-white rounded-t-3xl px-5 pt-5 pb-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setShowNoteSheet(false)} className="text-[#8A9E9E] text-[13px]">إلغاء</button>
              <h2 className="text-[15px] font-bold text-[#1A2424]">الملاحظة الداخلية</h2>
              <button onClick={() => setShowNoteSheet(false)} className="text-teal-primary text-[13px] font-bold">حفظ</button>
            </div>
            <textarea value={internalNote} onChange={e => setInternalNote(e.target.value)}
              placeholder="ملاحظة داخلية للطاقم الطبي فقط..." dir="rtl"
              className="w-full h-28 border border-[#E0EDED] rounded-xl px-4 py-3 text-[13px] text-[#1A2424] outline-none focus:border-teal-primary bg-[#F8FAFA] resize-none" />
            <p className="text-[11px] text-[#8A9E9E] mt-2 text-right">لا تظهر هذه الملاحظة للمريض</p>
          </div>
        </div>
      )}

      {/* No-show confirm */}
      {showNoShowConfirm && (
        <div className="absolute inset-0 bg-black/40 z-20 flex flex-col justify-end" onClick={() => setShowNoShowConfirm(false)}>
          <div className="bg-white rounded-t-3xl px-5 pt-5 pb-8 text-right" onClick={e => e.stopPropagation()}>
            <h2 className="text-[16px] font-bold text-[#1A2424] mb-2">تسجيل المريض كـ "لم يحضر"؟</h2>
            <p className="text-[13px] text-[#5A7070] mb-5">{isFamily ? 'سارة محمد' : 'محمد عبدالله'} — استشارة عامة · 09:30 ص</p>
            <div className="flex gap-3">
              <button onClick={() => { setStatus('no-show'); setShowNoShowConfirm(false); showToast('تم تسجيله كـ لم يحضر') }}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-[13px] font-bold">تأكيد</button>
              <button onClick={() => setShowNoShowConfirm(false)} className="flex-1 py-3 rounded-xl border border-[#E0EDED] text-[#374040] text-[13px] font-semibold">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Reschedule ─────────────────────────────────────────────────────────

function RescheduleScreen({ nav }: { nav: (s: Screen) => void }) {
  const [selectedDate, setSelectedDate] = useState(10)
  const [selectedSlot, setSelectedSlot] = useState('')
  const slots = ['09:00 ص', '09:30 ص', '10:00 ص', '10:30 ص', '11:00 ص', '11:30 ص', '01:00 م', '01:30 م', '02:00 م', '02:30 م', '12:30 م', '12:00 م']
  const dateRow = [{ d: 4, n: 'خ' }, { d: 5, n: 'ج' }, { d: 6, n: 'س' }, { d: 7, n: 'أ' }, { d: 9, n: 'إ' }, { d: 10, n: 'ث' }, { d: 13, n: 'أ' }]
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3 border-b border-[#E8F0F0]">
        <button onClick={() => nav('booking-details')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">إعادة جدولة الحجز</h1>
        <div className="w-9" />
      </div>
      {/* Current appointment */}
      <div className="mx-4 mt-4 bg-amber-50 rounded-2xl p-4 border border-amber-100">
        <div className="flex items-center gap-2 mb-2">
          <IcCalendar c="w-4 h-4 text-amber-600" />
          <p className="text-[12px] font-bold text-amber-700">الموعد الحالي</p>
        </div>
        <p className="text-[13px] font-semibold text-[#374040]">محمد عبدالله — استشارة عامة</p>
        <p className="text-[12px] text-[#8A9E9E] mt-0.5">الأحد، 7 يناير 2024 · 09:00 ص — 09:30 ص</p>
      </div>
      <div className="flex-1 px-4 py-4 flex flex-col gap-4">
        <p className="text-[14px] font-bold text-[#1A2424]">اختر التاريخ الجديد</p>
        {/* Date strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button className="flex items-center justify-center w-7 h-7">
            <IcChevronRight c="w-4 h-4 text-[#8A9E9E]" />
          </button>
          {dateRow.map(({ d, n }) => (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={cn('flex flex-col items-center py-2.5 px-3 rounded-xl flex-shrink-0 transition-all', d === selectedDate ? 'bg-teal-primary' : 'bg-[#F8FAFA] border border-[#E8F0F0]')}
            >
              <span className={cn('text-[10px] font-semibold', d === selectedDate ? 'text-white/70' : 'text-[#B0C4C4]')}>{n}</span>
              <span className={cn('text-[15px] font-bold', d === selectedDate ? 'text-white' : 'text-[#374040]')}>{d}</span>
            </button>
          ))}
          <button className="flex items-center justify-center w-7 h-7">
            <IcChevronLeft c="w-4 h-4 text-[#8A9E9E]" />
          </button>
        </div>
        <div>
          <p className="text-[14px] font-bold text-[#1A2424] mb-3">اختر الوقت المتاح</p>
          <div className="grid grid-cols-3 gap-2">
            {slots.map(slot => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={cn('py-3 rounded-xl text-[13px] font-semibold text-center transition-all border', selectedSlot === slot ? 'bg-teal-primary text-white border-teal-primary' : 'bg-[#F8FAFA] text-[#374040] border-[#E8F0F0]')}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <Btn disabled={!selectedSlot} onClick={() => nav('bookings')}>
            تأكيد إعادة الجدولة
          </Btn>
        </div>
      </div>
    </div>
  )
}

// ── Patient Controls ───────────────────────────────────────────────────

function PatientControlsScreen({ nav }: { nav: (s: Screen) => void }) {
  const [autoConfirm, setAutoConfirm] = useState(true)
  const [noPayment, setNoPayment] = useState(false)
  const [blocked, setBlocked] = useState(false)
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <div className="flex items-center px-4 py-3 gap-3">
          <button onClick={() => nav('booking-details')} className="w-9 h-9 flex items-center justify-center text-white">
            <IcChevronRight c="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center text-[17px] font-bold text-white">إعدادات المريض / القيود</h1>
          <div className="w-9" />
        </div>
      </div>
      {/* Patient info */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-teal-50 flex items-center justify-center">
            <IcUser c="w-6 h-6 text-teal-primary" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#1A2424]">محمد عبدالله</p>
            <p className="text-[12px] text-[#8A9E9E]">#7842 · +967 50 123 4567</p>
          </div>
        </div>
      </div>
      {/* Settings */}
      <div className="px-4 mt-4">
        <p className="text-[12px] font-bold text-[#8A9E9E] mb-2 px-1">إعدادات الحجز والتواصل</p>
        <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E8F0F0]">
            <div className="flex-1 text-right">
              <p className="text-[13px] font-semibold text-[#1A2424]">تأكيد الحجوزات القادمة تلقائيًا</p>
              <p className="text-[11px] text-[#8A9E9E] mt-0.5">يمكن للمريض تأكيد حجوزاته مباشرة</p>
            </div>
            <Toggle on={autoConfirm} onChange={setAutoConfirm} />
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="flex-1 text-right">
              <p className="text-[13px] font-semibold text-[#1A2424]">السماح بالحجز بدون دفع مسبق</p>
              <p className="text-[11px] text-[#8A9E9E] mt-0.5">عدم إلزام هذا المريض بالدفع المسبق</p>
            </div>
            <Toggle on={noPayment} onChange={setNoPayment} />
          </div>
        </div>
      </div>
      {/* Block section */}
      <div className="px-4 mt-4">
        <p className="text-[12px] font-bold text-[#8A9E9E] mb-2 px-1">قيود المريض</p>
        <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <Toggle on={blocked} onChange={setBlocked} />
            <div className="flex-1 text-right">
              <p className={cn('text-[13px] font-bold', blocked ? 'text-red-600' : 'text-[#1A2424]')}>منع الحجوزات المستقبلية</p>
              <p className="text-[11px] text-[#8A9E9E] mt-0.5">يمنع هذا المريض من حجز مواعيد جديدة</p>
            </div>
          </div>
          {blocked && (
            <div className="bg-red-50 rounded-xl p-3 mt-2">
              <p className="text-[11px] text-red-600 font-semibold mb-2">⚠️ لن يُلغى هذا الإجراء المواعيد الموجودة</p>
              <textarea
                placeholder="سبب الحظر (اختياري)..."
                rows={3}
                className="w-full bg-white border border-red-200 rounded-lg px-3 py-2 text-[12px] text-[#374040] placeholder:text-[#B0C4C4] focus:outline-none resize-none"
              />
            </div>
          )}
        </div>
      </div>
      <div className="px-4 mt-5 pb-6">
        <Btn onClick={() => nav('booking-details')}>حفظ الإعدادات</Btn>
      </div>
    </div>
  )
}

// ── Finance ────────────────────────────────────────────────────────────

function FinanceScreen({ nav }: { nav: (s: Screen) => void }) {
  const [finTab, setFinTab] = useState<'overview' | 'transactions' | 'settings'>('overview')
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('month')
  const [finLoc, setFinLoc] = useState('all')
  const finLocs = [
    { id: 'all', name: 'كل المواقع' },
    { id: 'madina', name: 'مركز المدينة' },
    { id: 'burj', name: 'برج الأطباء' },
    { id: 'jumhuriya', name: 'مستشفى الجمهورية' },
    { id: 'online', name: 'أونلاين' },
  ]
  const txns = [
    { name: 'أحمد علي', service: 'استشارة عامة', amount: '+15,000', date: '8 سبتمبر · 09:30 ص', method: 'عند الزيارة', status: 'مدفوع', type: 'credit' },
    { name: 'سارة محمد', service: 'استشارة تخصصية', amount: '+25,000', date: '8 سبتمبر · 10:00 ص', method: 'عند الزيارة', status: 'مدفوع', type: 'credit' },
    { name: 'خالد سالم', service: 'متابعة', amount: '+10,000', date: '7 سبتمبر · 11:15 ص', method: 'عند الزيارة', status: 'مدفوع', type: 'credit' },
    { name: 'نورة علي', service: 'استشارة عامة', amount: '+15,000', date: '7 سبتمبر · 02:00 م', method: 'عند الزيارة', status: 'غير مدفوع', type: 'pending' },
    { name: 'مبلغ مسترد', service: 'إلغاء حجز', amount: '-15,000', date: '6 سبتمبر', method: '—', status: 'مسترد', type: 'debit' },
  ]
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <div className="flex items-center px-4 py-3 gap-3">
          <button onClick={() => nav('more')} className="w-9 h-9 flex items-center justify-center text-white">
            <IcChevronRight c="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center text-[17px] font-bold text-white">المالية والمدفوعات</h1>
          <div className="w-9" />
        </div>
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {finLocs.map(loc => (
            <button key={loc.id} onClick={() => setFinLoc(loc.id)}
              className={cn('flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all',
                finLoc === loc.id ? 'bg-white text-teal-primary' : 'bg-white/20 text-white/90')}>
              {loc.name}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white border-b border-[#E8F0F0]">
        <div className="flex">
          {[{ id: 'overview', l: 'نظرة عامة' }, { id: 'transactions', l: 'المعاملات' }, { id: 'settings', l: 'إعدادات الدفع' }].map(t => (
            <button key={t.id} onClick={() => setFinTab(t.id as typeof finTab)}
              className={cn('flex-1 py-3 text-[12px] font-semibold border-b-2 transition-colors', finTab === t.id ? 'text-teal-primary border-teal-primary' : 'text-[#8A9E9E] border-transparent')}>
              {t.l}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 px-4 pt-4 flex flex-col gap-4">
        {finTab === 'overview' && (
          <>
            <div className="flex gap-1.5">
              {(['today', 'week', 'month'] as const).map((v, i) => {
                const labels = { today: 'اليوم', week: 'الأسبوع', month: 'الشهر' }
                return (
                  <button key={v} onClick={() => setPeriod(v)}
                    className={cn('flex-1 py-2 rounded-xl text-[12px] font-semibold border transition-all', period === v ? 'bg-teal-primary text-white border-teal-primary' : 'bg-white text-[#8A9E9E] border-[#E0EDED]')}>
                    {labels[v]}
                  </button>
                )
              })}
            </div>
            <div className="bg-teal-primary rounded-2xl p-4">
              <p className="text-white/70 text-[12px] mb-1">إجمالي الإيرادات</p>
              <p className="text-white text-[30px] font-extrabold">625,000 <span className="text-[18px]">ر.ي</span></p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-green-300 text-[12px] font-bold">↑ +11%</span>
                <span className="text-white/50 text-[11px]">مقارنة بالشهر الماضي</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: 'الحجوزات المدفوعة', v: '24 حجز', c: 'text-green-600' },
                { l: 'الدفع عند الزيارة', v: '310,000 ر.ي', c: 'text-teal-primary' },
                { l: 'المبالغ المستردة', v: '25,000 ر.ي', c: 'text-red-500' },
                { l: 'غير مدفوع', v: '3 حجوزات', c: 'text-amber-600' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-3.5 border border-[#E8F0F0] shadow-sm">
                  <p className={cn('text-[16px] font-extrabold', s.c)}>{s.v}</p>
                  <p className="text-[11px] text-[#8A9E9E] mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm p-4">
              <p className="text-[13px] font-bold text-[#1A2424] mb-3 text-right">حسب طريقة الدفع</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-green-600">310,000 ر.ي</p>
                  <p className="text-[13px] text-[#374040]">الدفع عند الزيارة</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-[#8A9E9E] bg-[#F8FAFA] rounded-full px-2 py-0.5">غير متاح لهذا الموقع</span>
                  </div>
                  <p className="text-[13px] text-[#8A9E9E]">الدفع الإلكتروني</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-3.5 border border-blue-100">
              <p className="text-[12px] text-blue-700 text-right leading-relaxed">يتطلب الدفع الإلكتروني أن يكون مقدم الخدمة مؤهلًا ومفعّلًا لهذه الخدمة.</p>
            </div>
          </>
        )}
        {finTab === 'transactions' && (
          <>
            <div className="flex gap-2">
              {['الكل', 'مدفوع', 'غير مدفوع', 'مسترد'].map((f, i) => (
                <button key={i} className={cn('flex-shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all', i === 0 ? 'bg-teal-primary text-white border-teal-primary' : 'bg-white text-[#8A9E9E] border-[#E0EDED]')}>
                  {f}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {txns.map((t, i) => (
                <button key={i} onClick={() => nav('finance-transactions')} className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm flex items-center justify-between w-full">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', t.type === 'credit' ? 'bg-green-50' : t.type === 'debit' ? 'bg-red-50' : 'bg-amber-50')}>
                      <IcMoney c={cn('w-5 h-5', t.type === 'credit' ? 'text-green-600' : t.type === 'debit' ? 'text-red-500' : 'text-amber-600')} />
                    </div>
                    <div className="min-w-0 text-right">
                      <p className="text-[13px] font-bold text-[#1A2424]">{t.name}</p>
                      <p className="text-[11px] text-[#8A9E9E] mt-0.5">{t.service} · {t.date}</p>
                      <p className="text-[11px] text-[#B0C4C4]">{t.method}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge label={t.status} variant={t.type === 'credit' ? 'success' : t.type === 'debit' ? 'error' : 'warning'} />
                    <p className={cn('text-[13px] font-bold', t.type === 'credit' ? 'text-green-600' : t.type === 'debit' ? 'text-red-500' : 'text-amber-600')}>{t.amount}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
        {finTab === 'settings' && (
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm">
              <div className="p-4 text-right">
                <p className="text-[14px] font-bold text-[#1A2424] mb-3">طرق الدفع المتاحة</p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Badge label="متاح" variant="success" />
                    <p className="text-[14px] font-semibold text-[#1A2424]">الدفع عند الزيارة</p>
                  </div>
                  <Divider />
                  <div className="flex items-center justify-between">
                    <Badge label="غير متاح حاليًا" variant="gray" />
                    <p className="text-[14px] font-semibold text-[#8A9E9E]">الدفع الإلكتروني</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-right">
              <p className="text-[13px] font-bold text-amber-800 mb-1">الدفع الإلكتروني غير متاح لهذا الموقع</p>
              <p className="text-[12px] text-amber-700 leading-relaxed">يتطلب تفعيل الدفع الإلكتروني أن يكون مقدم الخدمة (Provider) مؤهلًا ومفعّلًا لهذه الخدمة من DocGate.</p>
            </div>
          </div>
        )}
        <div className="flex gap-3">
          <Btn variant="secondary" onClick={() => nav('finance-transactions')} className="flex-1 text-[13px] py-3">
            كل المعاملات
          </Btn>
          <Btn variant="secondary" onClick={() => nav('finance-payment-settings')} className="flex-1 text-[13px] py-3">
            إعدادات الدفع
          </Btn>
        </div>
        <Btn onClick={() => {}}>
          <IcMoney c="w-5 h-5" />
          طلب صرف المستحقات
        </Btn>
      </div>
      <div className="h-4" />
    </div>
  )
}

// ── Appointments Screen (Central Hub) ─────────────────────────────────

function AppointmentsScreen({ nav, onboarding = false }: { nav: (s: Screen) => void; onboarding?: boolean }) {
  const locations = [
    { id: 'madina', name: 'مركز المدينة الطبي', dept: 'العيادة العامة', city: 'عدن – المنصورة' },
    { id: 'burj', name: 'برج الأطباء', dept: 'العيادة الخاصة', city: 'عدن' },
    { id: 'jumhuriya', name: 'مستشفى الجمهورية', dept: 'قسم الباطنية', city: 'عدن – خور مكسر' },
  ]

  type Period = { label: string; from: string; to: string; dur: number; slots: number; special?: boolean; methods?: string[] }

  const [locId, setLocId] = useState('madina')
  const [schedTab, setSchedTab] = useState<'weekly' | 'monthly'>('weekly')
  const [weekOffset, setWeekOffset] = useState(0)
  const [monthOffset, setMonthOffset] = useState(0)
  const [offDays, setOffDays] = useState(['الجمعة'])

  const [showLocSheet, setShowLocSheet] = useState(false)
  const [showAddPeriod, setShowAddPeriod] = useState(false)
  const [showAddSpecial, setShowAddSpecial] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showHoliday, setShowHoliday] = useState(false)
  const [showEmergency, setShowEmergency] = useState(false)
  const [activePeriod, setActivePeriod] = useState<{ period: Period; dayName: string } | null>(null)
  const [showEditPeriod, setShowEditPeriod] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [previewName, setPreviewName] = useState('')
  const [selectedDate, setSelectedDate] = useState<number | null>(5)

  const [apDays, setApDays] = useState<string[]>([])
  const [apName, setApName] = useState('')
  const [apFrom, setApFrom] = useState('08:00')
  const [apTo, setApTo] = useState('13:00')
  const [apDur, setApDur] = useState(15)
  const [apRepeat, setApRepeat] = useState(true)
  const [apRepeatType, setApRepeatType] = useState<'none' | 'until' | 'weeks'>('none')
  const [apBooking, setApBooking] = useState(true)
  const [apMethods, setApMethods] = useState<string[]>(['حجز موعد'])

  const [epDays, setEpDays] = useState<string[]>([])
  const [epName, setEpName] = useState('')
  const [epFrom, setEpFrom] = useState('08:00')
  const [epTo, setEpTo] = useState('13:00')
  const [epDur, setEpDur] = useState(15)
  const [epRepeat, setEpRepeat] = useState(true)
  const [epRepeatType, setEpRepeatType] = useState<'none' | 'until' | 'weeks'>('none')
  const [epBooking, setEpBooking] = useState(true)
  const [epMethods, setEpMethods] = useState<string[]>(['حجز موعد'])

  const [spDay, setSpDay] = useState('السبت')
  const [spName, setSpName] = useState('')
  const [spFrom, setSpFrom] = useState('10:00')
  const [spTo, setSpTo] = useState('12:00')
  const [spDur, setSpDur] = useState(20)
  const [spBooking, setSpBooking] = useState(true)
  const [spMethods, setSpMethods] = useState<string[]>(['حجز موعد'])

  const [hlFrom, setHlFrom] = useState('')
  const [hlTo, setHlTo] = useState('')
  const [hlMode, setHlMode] = useState<'full' | 'period'>('full')
  const [hlReason, setHlReason] = useState('')
  const [emMode, setEmMode] = useState<'day' | 'period'>('day')

  const weekDayNames = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']

  const fullSchedule: { name: string; periods: Period[] }[] = [
    { name: 'السبت', periods: [
      { label: 'صباحي', from: '08:00', to: '13:00', dur: 15, slots: 20, methods: ['حجز موعد'] },
      { label: 'مسائي', from: '17:00', to: '21:00', dur: 15, slots: 16, methods: ['حجز موعد'] },
    ]},
    { name: 'الأحد', periods: [
      { label: 'صباحي', from: '08:00', to: '13:00', dur: 15, slots: 20, methods: ['حجز موعد'] },
      { label: 'مسائي', from: '17:00', to: '21:00', dur: 15, slots: 16, methods: ['حجز موعد'] },
    ]},
    { name: 'الاثنين', periods: [
      { label: 'صباحي', from: '08:00', to: '13:00', dur: 15, slots: 20, methods: ['حجز موعد'] },
      { label: 'مسائي', from: '17:00', to: '21:00', dur: 15, slots: 13, methods: ['حجز موعد'] },
    ]},
    { name: 'الثلاثاء', periods: [
      { label: 'صباحي', from: '08:00', to: '13:00', dur: 15, slots: 20, methods: ['حجز موعد'] },
      { label: 'خاص', from: '10:00', to: '12:00', dur: 20, slots: 8, special: true, methods: ['VIP'] },
      { label: 'مسائي', from: '12:00', to: '13:00', dur: 15, slots: 4, methods: ['حجز موعد'] },
    ]},
    { name: 'الأربعاء', periods: [
      { label: 'صباحي', from: '08:00', to: '13:00', dur: 15, slots: 20, methods: ['حجز موعد'] },
    ]},
    { name: 'الخميس', periods: [] },
    { name: 'الجمعة', periods: [] },
  ]

  const [weekDays, setWeekDays] = useState<{ name: string; periods: Period[] }[]>(
    onboarding ? weekDayNames.map(n => ({ name: n, periods: [] })) : fullSchedule
  )

  const templateData: { name: string; periods: Period[] }[] = weekDayNames.map((name, i) => ({
    name,
    periods: i < 5
      ? [{ label: 'صباحي', from: '08:00', to: '13:00', dur: 15, slots: 20, methods: ['حجز موعد'] }]
      : [],
  }))

  const displayDays = isPreviewMode ? templateData : weekDays
  const activeLoc = locations.find(l => l.id === locId) || locations[0]
  const workDaysCount = weekDays.filter(d => !offDays.includes(d.name) && d.periods.length > 0).length
  const weekDates = weekDayNames.map((_, i) => 5 + i + weekOffset * 7)

  const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
  const currentMonth = ((8 + monthOffset) % 12 + 12) % 12
  const currentYear = 2026 + Math.floor((8 + monthOffset) / 12)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const jsFirstDay = new Date(currentYear, currentMonth, 1).getDay()
  const firstCol = (jsFirstDay + 1) % 7

  const calcSlots = (from: string, to: string, dur: number) => {
    try {
      const [fh, fm] = from.split(':').map(Number)
      const [th, tm] = to.split(':').map(Number)
      return Math.max(0, Math.floor(((th * 60 + tm) - (fh * 60 + fm)) / dur))
    } catch { return 0 }
  }

  const getDayDots = (dayNum: number): ('work' | 'special')[] => {
    if (dayNum < 1 || dayNum > daysInMonth) return []
    const dow = (firstCol + dayNum - 1) % 7
    if (dow === 6) return []
    const dots: ('work' | 'special')[] = []
    if (dow < 5) dots.push('work')
    if (dayNum === 8) dots.push('special')
    return dots
  }

  const toggleOffDay = (day: string) =>
    setOffDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])

  const togMethod = (methods: string[], setter: (v: string[]) => void, m: string) =>
    setter(methods.includes(m) ? methods.filter(x => x !== m) : [...methods, m])

  const addPeriod = () => {
    if (!apName || apDays.length === 0) return
    setWeekDays(prev => prev.map(d =>
      apDays.includes(d.name)
        ? { ...d, periods: [...d.periods, { label: apName, from: apFrom, to: apTo, dur: apDur, slots: calcSlots(apFrom, apTo, apDur), methods: [...apMethods] }] }
        : d
    ))
    setApDays([]); setApName(''); setShowAddPeriod(false)
  }

  const addSpecialPeriod = () => {
    if (!spName) return
    setWeekDays(prev => prev.map(d =>
      d.name === spDay
        ? { ...d, periods: [...d.periods, { label: spName, from: spFrom, to: spTo, dur: spDur, slots: calcSlots(spFrom, spTo, spDur), special: true, methods: [...spMethods] }] }
        : d
    ))
    setSpName(''); setShowAddSpecial(false)
  }

  const deletePeriod = (dayName: string, periodLabel: string) => {
    setWeekDays(prev => prev.map(d =>
      d.name === dayName ? { ...d, periods: d.periods.filter(p => p.label !== periodLabel) } : d
    ))
    setActivePeriod(null)
  }

  const openEdit = (period: Period, dayName: string) => {
    setEpName(period.label); setEpFrom(period.from); setEpTo(period.to)
    setEpDur(period.dur); setEpMethods(period.methods || ['حجز موعد']); setEpDays([dayName])
    setShowEditPeriod(true)
  }

  const saveEdit = () => {
    if (!activePeriod) return
    setWeekDays(prev => prev.map(d =>
      d.name === activePeriod.dayName
        ? { ...d, periods: d.periods.map(p =>
            p.label === activePeriod.period.label
              ? { ...p, label: epName, from: epFrom, to: epTo, dur: epDur, slots: calcSlots(epFrom, epTo, epDur), methods: [...epMethods] }
              : p
          )}
        : d
    ))
    setShowEditPeriod(false); setActivePeriod(null)
  }

  // ── Inner UI helpers (no hooks, safe inside component) ──

  const Sheet = ({ title, subtitle, onClose, children }: { title: string; subtitle?: string; onClose: () => void; children: React.ReactNode }) => (
    <div className="absolute inset-0 bg-black/40 z-50 flex flex-col justify-end">
      <div className="bg-white rounded-t-3xl max-h-[92%] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0F4F4] flex-shrink-0">
          <button onClick={onClose} className="text-[13px] text-[#8A9E9E] font-semibold">إغلاق</button>
          <div className="flex-1 text-center">
            <p className="text-[15px] font-bold text-[#1A2424]">{title}</p>
            {subtitle && <p className="text-[11px] text-[#8A9E9E] mt-0.5">{subtitle}</p>}
          </div>
          <div className="w-10" />
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  )

  const Tog = ({ on, setOn }: { on: boolean; setOn: (v: boolean) => void }) => (
    <button onClick={() => setOn(!on)}
      className={cn('w-12 h-6 rounded-full flex items-center transition-colors flex-shrink-0 px-0.5', on ? 'bg-teal-primary justify-end' : 'bg-[#D0D8D8] justify-start')}>
      <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
    </button>
  )

  const MethodCards = ({ methods, setMethods }: { methods: string[]; setMethods: (v: string[]) => void }) => (
    <div className="flex gap-2">
      {([['حجز موعد', '📅'], ['حجز فوري', '⚡'], ['VIP', '⭐']] as const).map(([label, icon]) => (
        <button key={label} onClick={() => togMethod(methods, setMethods, label)}
          className={cn('flex-1 flex flex-col items-center py-3 px-1 rounded-2xl border gap-1.5 transition-all',
            methods.includes(label) ? 'bg-teal-50 border-teal-primary' : 'bg-[#F8FAFA] border-[#E0EDED]')}>
          <span className="text-[18px]">{icon}</span>
          <span className={cn('text-[10px] font-bold text-center leading-tight', methods.includes(label) ? 'text-teal-primary' : 'text-[#8A9E9E]')}>{label}</span>
        </button>
      ))}
    </div>
  )

  const SummaryCard = ({ days, name, from, to, dur, methods }: { days?: string[]; name: string; from: string; to: string; dur: number; methods: string[] }) => (
    <div className="bg-[#1A2828] rounded-2xl p-4">
      <p className="text-[10px] text-white/40 mb-2 text-right">ملخص الفترة</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {days && days.length > 0 && <div><p className="text-[9px] text-white/40 text-right">أيام الفترة</p><p className="text-[12px] font-bold text-white text-right">{days.join(' · ')}</p></div>}
        <div><p className="text-[9px] text-white/40 text-right">الوقت</p><p className="text-[12px] font-bold text-white text-right">{from}–{to}</p></div>
        <div><p className="text-[9px] text-white/40 text-right">مدة الموعد</p><p className="text-[12px] font-bold text-white text-right">{dur} دقيقة</p></div>
        <div><p className="text-[9px] text-white/40 text-right">المواعيد</p><p className="text-[12px] font-bold text-white text-right">{calcSlots(from, to, dur)} موعداً</p></div>
        {methods.length > 0 && <div><p className="text-[9px] text-white/40 text-right">طرق الحجز</p><p className="text-[12px] font-bold text-white text-right">{methods.join(' · ')}</p></div>}
      </div>
    </div>
  )

  const DayPicker = ({ selected, setSelected, multi = true }: { selected: string[]; setSelected: (v: string[]) => void; multi?: boolean }) => (
    <div className="flex flex-wrap gap-1.5">
      {weekDayNames.map(d => {
        const isHol = offDays.includes(d)
        const isSel = selected.includes(d)
        return (
          <button key={d} onClick={() => {
            if (isHol) return
            if (multi) setSelected(isSel ? selected.filter(x => x !== d) : [...selected, d])
            else setSelected([d])
          }} className={cn('px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all',
            isSel ? 'bg-teal-primary text-white border-teal-primary'
            : isHol ? 'bg-amber-50 text-amber-400 border-amber-200 opacity-70'
            : 'bg-[#F0F4F4] text-[#8A9E9E] border-transparent')}>
            {d}{isHol ? ' ·إجازة' : ''}
          </button>
        )
      })}
    </div>
  )

  const RepeatBlock = ({ repeat, setRepeat, rType, setRType }: { repeat: boolean; setRepeat: (v: boolean) => void; rType: 'none'|'until'|'weeks'; setRType: (v: 'none'|'until'|'weeks') => void }) => (
    <div className="bg-[#F8FAFA] rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Tog on={repeat} setOn={setRepeat} />
        <p className="text-[13px] font-bold text-[#1A2424]">تكرار أسبوعياً</p>
      </div>
      {repeat && (
        <div className="flex flex-col gap-1.5">
          {([['none', 'بدون تاريخ انتهاء'], ['until', 'حتى تاريخ محدد'], ['weeks', 'عدد محدد من الأسابيع']] as const).map(([id, lbl]) => (
            <button key={id} onClick={() => setRType(id)}
              className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl border text-right',
                rType === id ? 'bg-teal-50 border-teal-200' : 'bg-white border-[#E0EDED]')}>
              <div className={cn('w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center',
                rType === id ? 'border-teal-primary' : 'border-[#C0D4D4]')}>
                {rType === id && <div className="w-2 h-2 rounded-full bg-teal-primary" />}
              </div>
              <span className="text-[12px] font-semibold text-[#1A2424]">{lbl}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )

  const DetailsBlock = ({ name, setName, from, setFrom, to, setTo, dur, setDur, accent = 'teal' }: {
    name: string; setName: (v: string) => void; from: string; setFrom: (v: string) => void
    to: string; setTo: (v: string) => void; dur: number; setDur: (v: number) => void; accent?: string
  }) => (
    <div className="bg-[#F8FAFA] rounded-2xl p-4 flex flex-col gap-3">
      <p className="text-[13px] font-bold text-[#1A2424] text-right">تفاصيل الفترة</p>
      <div>
        <label className="text-[12px] font-semibold text-[#374040] block mb-1 text-right">اسم الفترة</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="مثال: صباحي، مسائي"
          className="w-full bg-white border border-[#E0EDED] rounded-xl px-4 py-2.5 text-[13px] text-[#1A2424] focus:outline-none focus:border-teal-primary text-right" />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-[12px] font-semibold text-[#374040] block mb-1 text-right">من</label>
          <input type="time" value={from} onChange={e => setFrom(e.target.value)}
            className="w-full bg-white border border-[#E0EDED] rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:border-teal-primary" />
        </div>
        <div className="flex-1">
          <label className="text-[12px] font-semibold text-[#374040] block mb-1 text-right">إلى</label>
          <input type="time" value={to} onChange={e => setTo(e.target.value)}
            className="w-full bg-white border border-[#E0EDED] rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:border-teal-primary" />
        </div>
      </div>
      <div>
        <label className="text-[12px] font-semibold text-[#374040] block mb-1.5 text-right">مدة الموعد</label>
        <div className="flex gap-1.5 flex-wrap">
          {[15, 20, 30, 45, 60].map(d => (
            <button key={d} onClick={() => setDur(d)}
              className={cn('px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all',
                dur === d ? 'bg-teal-primary text-white border-teal-primary' : 'bg-white text-[#8A9E9E] border-[#E0EDED]')}>
              {d} د
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  // ── Main render ──
  return (
    <div className="flex-1 flex flex-col overflow-hidden relative bg-[#EEF3F3]">
      <StatusBar />
      <div className="flex-1 overflow-y-auto">

        {/* Onboarding back button */}
        {onboarding && (
          <button onClick={() => nav('onboarding-location')} className="flex items-center gap-1 px-4 pt-3 pb-1 text-[#374040]">
            <IcChevronRight c="w-5 h-5" />
            <span className="text-[13px] font-semibold">الرجوع</span>
          </button>
        )}

        {/* ── HEADER CARD ── */}
        <div className={cn('mx-4 bg-white rounded-3xl border border-[#E4EEEE] shadow-sm p-5', onboarding ? 'mt-0' : 'mt-4')}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] font-bold text-[#374040] bg-[#F0F9F9] px-2.5 py-1 rounded-xl">د.ع</span>
            <div className="flex items-center gap-2.5">
              <div className="text-right">
                <p className="text-[14px] font-bold text-[#1A2424]">DocGate</p>
                <p className="text-[10px] text-[#8A9E9E]">بوابة الرعاية المتصلة</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-teal-primary flex items-center justify-center flex-shrink-0">
                <IcPlus c="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-1.5 mb-1">
            <span className="text-[11px] text-[#8A9E9E] font-medium">موقع العمل</span>
            <IcCalendar c="w-3.5 h-3.5 text-[#8A9E9E]" />
          </div>
          <h1 className="text-[26px] font-bold text-[#1A2424] text-right leading-tight mb-1">الجدول والمواعيد</h1>
          <p className="text-[13px] text-[#8A9E9E] text-right">
            {onboarding ? 'مركز المدينة الطبي' : activeLoc.name} · {onboarding ? 'العيادة العامة' : activeLoc.dept}
          </p>
          <div className="flex items-center justify-between mt-3">
            {!onboarding && (
              <button onClick={() => setShowLocSheet(true)} className="text-[11px] text-teal-primary font-semibold underline">تغيير الموقع</button>
            )}
            <button onClick={() => !onboarding && setShowLocSheet(true)}
              className="flex items-center gap-1.5 bg-teal-50 border border-teal-100 rounded-xl px-3 py-1.5">
              <span className="text-[11px] font-bold text-teal-primary">مفعّل</span>
              <span className="text-[11px] text-teal-primary">✓</span>
            </button>
          </div>
        </div>

        {/* ── WEEK NAV ── */}
        <div className="mx-4 mt-3 bg-white rounded-2xl border border-[#E4EEEE] shadow-sm px-4 py-3 flex items-center justify-between">
          <button onClick={() => setWeekOffset(w => w + 1)} className="w-9 h-9 rounded-xl bg-[#F0F4F4] flex items-center justify-center">
            <IcChevronLeft c="w-4 h-4 text-[#374040]" />
          </button>
          <div className="text-center">
            <p className="text-[11px] text-[#8A9E9E] mb-0.5">
              {weekOffset === 0 ? 'الأسبوع الحالي' : weekOffset > 0 ? `بعد ${weekOffset} أسبوع` : `قبل ${-weekOffset} أسبوع`}
            </p>
            <p className="text-[14px] font-bold text-[#1A2424]">{weekDates[0]} سبتمبر – {weekDates[6]} سبتمبر ٢٠٢٦</p>
          </div>
          <button onClick={() => setWeekOffset(w => w - 1)} className="w-9 h-9 rounded-xl bg-[#F0F4F4] flex items-center justify-center">
            <IcChevronRight c="w-4 h-4 text-[#374040]" />
          </button>
        </div>

        {/* ── SEGMENTED CONTROL ── */}
        <div className="mx-4 mt-3 bg-white rounded-2xl border border-[#E4EEEE] shadow-sm p-1.5 flex gap-1">
          <button onClick={() => setSchedTab('monthly')}
            className={cn('flex-1 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 transition-all',
              schedTab === 'monthly' ? 'bg-white shadow border border-[#E4EEEE] text-[#1A2424]' : 'text-[#8A9E9E]')}>
            <IcCalendar c="w-4 h-4" /> شهري
          </button>
          <button onClick={() => setSchedTab('weekly')}
            className={cn('flex-1 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 transition-all',
              schedTab === 'weekly' ? 'bg-white shadow border border-[#E4EEEE] text-[#1A2424]' : 'text-[#8A9E9E]')}>
            <IcSettings c="w-4 h-4" /> أسبوعي
          </button>
        </div>

        {/* ══════════════════════════════
            WEEKLY VIEW
        ══════════════════════════════ */}
        {schedTab === 'weekly' && (
          <div className="px-4 pt-4 pb-10 flex flex-col gap-5">

            {/* Preview Banner */}
            {isPreviewMode && (
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                <button onClick={() => { setIsPreviewMode(false); setPreviewName('') }}
                  className="text-[11px] text-purple-400 font-bold border border-purple-200 rounded-xl px-3 py-1.5 flex-shrink-0">إلغاء</button>
                <div className="text-right">
                  <p className="text-[13px] font-bold text-purple-700">معاينة: {previewName}</p>
                  <p className="text-[11px] text-purple-500 mt-0.5">لم يتم التطبيق بعد</p>
                </div>
              </div>
            )}

            {/* Onboarding empty hint */}
            {onboarding && weekDays.every(d => d.periods.length === 0) && (
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 text-center">
                <p className="text-[14px] font-bold text-teal-primary mb-1">لم تضف فترات عمل لهذا الأسبوع بعد</p>
                <p className="text-[12px] text-teal-600 mb-3">أضف فترة عمل معتادة لتبدأ جدولك الأسبوعي</p>
                <button onClick={() => setShowAddPeriod(true)} className="px-5 py-2.5 bg-teal-primary text-white text-[13px] font-bold rounded-xl">
                  إضافة فترة معتادة
                </button>
              </div>
            )}

            {/* الإجازة الأسبوعية */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] text-[#8A9E9E]">ضبط متكرر</span>
                <p className="text-[15px] font-bold text-[#1A2424]">الإجازة الأسبوعية</p>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-0.5">
                {weekDayNames.map(d => (
                  <button key={d} onClick={() => toggleOffDay(d)}
                    className={cn('flex-shrink-0 px-3.5 py-2 rounded-full text-[12px] font-semibold border transition-all',
                      offDays.includes(d)
                        ? 'bg-[#F0F4F4] text-[#374040] border-[#D0D8D8]'
                        : 'bg-white text-[#8A9E9E] border-[#E4EEEE]')}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* جدول هذا الأسبوع */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-[#8A9E9E]">
                  <IcClock c="w-3.5 h-3.5" />
                  <span className="text-[11px]">{workDaysCount} أيام عمل</span>
                </div>
                <p className="text-[15px] font-bold text-[#1A2424]">
                  {isPreviewMode ? `جدول هذا الأسبوع (${previewName})` : 'جدول هذا الأسبوع'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {displayDays.map((d, i) => {
                  const isOff = offDays.includes(d.name)
                  return (
                    <div key={d.name} className={cn('rounded-2xl border shadow-sm', isOff ? 'bg-[#F8FAFA] border-[#E8EDED]' : 'bg-white border-[#E4EEEE]')}>
                      <div className="px-3 pt-3 pb-2.5 flex items-start justify-between border-b border-[#F2F6F6]">
                        <div className={cn('w-2 h-2 rounded-full mt-1 flex-shrink-0',
                          isOff ? 'bg-[#D0DCDC]' : d.periods.length > 0 ? 'bg-teal-primary' : 'bg-[#D0DCDC]')} />
                        <div className="text-right">
                          <p className={cn('text-[13px] font-bold', isOff ? 'text-[#A0B4B4]' : 'text-[#1A2424]')}>{d.name}</p>
                          <p className="text-[10px] text-[#8A9E9E]">{weekDates[i]} سبتمبر</p>
                        </div>
                      </div>
                      <div className="px-3 py-2.5 flex flex-col gap-2">
                        {isOff ? (
                          <div className="flex justify-end">
                            <span className="text-[10px] bg-[#F0F4F4] text-[#8A9E9E] font-semibold px-2 py-0.5 rounded-full">إجازة</span>
                          </div>
                        ) : d.periods.length === 0 ? (
                          <p className="text-[10px] text-[#B0C4C4] text-center py-2">لا توجد فترات</p>
                        ) : (
                          d.periods.map((p, j) => (
                            <button key={j} onClick={() => setActivePeriod({ period: p, dayName: d.name })}
                              className={cn('w-full text-right rounded-xl px-2.5 py-2 transition-all',
                                p.special ? 'bg-purple-50 border border-purple-100' : 'bg-[#F0FAF9] border border-teal-100/50')}>
                              <div className="flex items-start justify-between gap-1">
                                <span className={cn('text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5',
                                  p.special ? 'bg-purple-100 text-purple-600' : 'bg-white text-teal-primary border border-teal-100')}>
                                  {p.slots}
                                </span>
                                <div>
                                  <p className={cn('text-[11px] font-bold leading-tight', p.special ? 'text-purple-700' : 'text-[#1A2424]')}>{p.label}</p>
                                  <p className={cn('text-[10px]', p.special ? 'text-purple-500' : 'text-teal-600')}>{p.from}–{p.to}</p>
                                  <p className="text-[9px] text-[#8A9E9E]">كل {p.dur} دق.</p>
                                </div>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Preview apply actions */}
            {isPreviewMode && (
              <div className="bg-white border border-purple-100 rounded-2xl p-4 flex flex-col gap-2">
                <Btn onClick={() => { setWeekDays([...templateData]); setIsPreviewMode(false); setPreviewName('') }}>تطبيق هذا الأسبوع</Btn>
                <Btn variant="secondary" onClick={() => { setWeekDays([...templateData]); setIsPreviewMode(false); setPreviewName('') }}>تطبيق وتكرار</Btn>
                <button onClick={() => { setIsPreviewMode(false); setPreviewName('') }}
                  className="py-2.5 text-[13px] text-[#8A9E9E] font-semibold text-center">إلغاء المعاينة</button>
              </div>
            )}

            {/* إدارة الجدول */}
            {!isPreviewMode && (
              <div>
                <p className="text-[15px] font-bold text-[#1A2424] text-right mb-3">إدارة الجدول</p>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setShowAddPeriod(true)}
                    className="bg-white rounded-2xl border border-[#E4EEEE] shadow-sm px-4 py-3.5 flex items-center gap-3">
                    <div className="flex-1 text-right">
                      <p className="text-[13px] font-bold text-[#1A2424]">إضافة فترة معتادة</p>
                      <p className="text-[11px] text-[#8A9E9E]">تطبق على يوم أو أكثر من 00:00</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <IcPlus c="w-5 h-5 text-teal-primary" />
                    </div>
                    <IcChevronLeft c="w-4 h-4 text-[#B0C4C4] flex-shrink-0" />
                  </button>

                  <button onClick={() => setShowAddSpecial(true)}
                    className="bg-white rounded-2xl border border-purple-100 shadow-sm px-4 py-3.5 flex items-center gap-3">
                    <div className="flex-1 text-right">
                      <p className="text-[13px] font-bold text-[#1A2424]">إضافة فترة خاصة</p>
                      <p className="text-[11px] text-[#8A9E9E]">أولوية أعلى من الجدول العادي</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <IcStar c="w-5 h-5 text-purple-500" />
                    </div>
                    <IcChevronLeft c="w-4 h-4 text-[#B0C4C4] flex-shrink-0" />
                  </button>

                  {!onboarding && (
                    <>
                      <button onClick={() => setShowTemplates(true)}
                        className="bg-white rounded-2xl border border-[#E4EEEE] shadow-sm px-4 py-3.5 flex items-center gap-3">
                        <div className="flex-1 text-right">
                          <p className="text-[13px] font-bold text-[#1A2424]">النماذج المحفوظة</p>
                          <p className="text-[11px] text-[#8A9E9E]">2 نماذج جاهزة للاستخدام</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#F0F4F4] flex items-center justify-center flex-shrink-0">
                          <IcSettings c="w-5 h-5 text-[#374040]" />
                        </div>
                        <IcChevronLeft c="w-4 h-4 text-[#B0C4C4] flex-shrink-0" />
                      </button>

                      <button onClick={() => setShowHoliday(true)}
                        className="bg-white rounded-2xl border border-[#E4EEEE] shadow-sm px-4 py-3.5 flex items-center gap-3">
                        <div className="flex-1 text-right">
                          <p className="text-[13px] font-bold text-[#1A2424]">الإجازات المجدولة</p>
                          <p className="text-[11px] text-[#8A9E9E]">تخطيط للإجازات المستقبلية</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                          <IcCalendar c="w-5 h-5 text-amber-500" />
                        </div>
                        <IcChevronLeft c="w-4 h-4 text-[#B0C4C4] flex-shrink-0" />
                      </button>

                      <button onClick={() => setShowEmergency(true)}
                        className="bg-white rounded-2xl border border-red-100 shadow-sm px-4 py-3.5 flex items-center gap-3">
                        <div className="flex-1 text-right">
                          <p className="text-[13px] font-bold text-[#1A2424]">إجازة طارئة</p>
                          <p className="text-[11px] text-[#8A9E9E]">إغلاق فوري ليوم أو فترة من الأسبوع</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                          <IcBell c="w-5 h-5 text-red-500" />
                        </div>
                        <IcChevronLeft c="w-4 h-4 text-[#B0C4C4] flex-shrink-0" />
                      </button>

                      <button className="w-full mt-1 py-3 text-[13px] font-semibold text-red-400 border border-dashed border-red-200 rounded-2xl">
                        حذف جدول الأسبوع 🗑️
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {onboarding && (
              <Btn onClick={() => nav('schedule-done')}>حفظ الجدول والمتابعة</Btn>
            )}

            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="text-[10px] text-[#8A9E9E]">جميع تحديثات الجدول تُعرض مباشرة للطبيب</span>
              <span>💚</span>
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            MONTHLY VIEW
        ══════════════════════════════ */}
        {schedTab === 'monthly' && (
          <div className="px-4 pt-4 pb-10 flex flex-col gap-4">

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {[['bg-teal-primary', 'دوام'], ['bg-purple-500', 'خاص'], ['bg-red-400', 'إجازة']].map(([cls, lbl]) => (
                  <div key={lbl} className="flex items-center gap-1">
                    <div className={cn('w-2 h-2 rounded-full flex-shrink-0', cls)} />
                    <span className="text-[10px] text-[#8A9E9E] font-medium">{lbl}</span>
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-[#8A9E9E]">للمراجعة والتنقل</span>
            </div>

            <p className="text-[22px] font-bold text-[#1A2424] text-right">{monthNames[currentMonth]} {currentYear}</p>

            <div className="bg-white rounded-2xl border border-[#E4EEEE] shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setMonthOffset(o => o + 1)} className="w-8 h-8 rounded-xl bg-[#F0F4F4] flex items-center justify-center">
                  <IcChevronLeft c="w-4 h-4 text-[#374040]" />
                </button>
                <p className="text-[14px] font-bold text-[#1A2424]">{monthNames[currentMonth]} {currentYear}</p>
                <button onClick={() => setMonthOffset(o => o - 1)} className="w-8 h-8 rounded-xl bg-[#F0F4F4] flex items-center justify-center">
                  <IcChevronRight c="w-4 h-4 text-[#374040]" />
                </button>
              </div>

              <div className="grid grid-cols-7 mb-2">
                {['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'].map((h, i) => (
                  <div key={i} className="text-center text-[11px] font-bold text-[#8A9E9E] py-1">{h}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-0.5">
                {Array.from({ length: Math.ceil((firstCol + daysInMonth) / 7) * 7 }).map((_, idx) => {
                  const dayNum = idx - firstCol + 1
                  const valid = dayNum >= 1 && dayNum <= daysInMonth
                  const dow = valid ? (firstCol + dayNum - 1) % 7 : -1
                  const isFri = dow === 6
                  const isSel = valid && dayNum === selectedDate
                  const dots = valid ? getDayDots(dayNum) : []
                  return (
                    <button key={idx}
                      onClick={() => { if (!valid) return; setSelectedDate(dayNum); setWeekOffset(0); setSchedTab('weekly') }}
                      className={cn('flex flex-col items-center py-1 rounded-xl transition-all',
                        isSel ? 'bg-teal-primary' : valid ? 'hover:bg-[#F0FAF9]' : '')}>
                      {valid && (
                        <>
                          <span className={cn('text-[12px] font-semibold leading-none',
                            isSel ? 'text-white' : isFri ? 'text-[#C0CCCC]' : 'text-[#1A2424]')}>
                            {dayNum}
                          </span>
                          <div className="flex gap-0.5 mt-0.5 h-1.5 items-center">
                            {isFri
                              ? <div className={cn('w-1.5 h-1.5 rounded-full', isSel ? 'bg-white/60' : 'bg-red-300')} />
                              : dots.length > 0
                                ? dots.map((t, di) => (
                                  <div key={di} className={cn('w-1.5 h-1.5 rounded-full',
                                    isSel ? 'bg-white/70' : t === 'work' ? 'bg-teal-primary' : 'bg-purple-500')} />
                                ))
                                : <div className="w-1.5 h-1.5" />
                            }
                          </div>
                        </>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E4EEEE] shadow-sm p-4 flex items-start gap-3">
              <span className="text-teal-primary text-[16px] flex-shrink-0">ℹ️</span>
              <p className="text-[12px] text-[#8A9E9E] leading-relaxed text-right flex-1">
                اضغط على أي تاريخ للعودة إلى العرض الأسبوعي ومراجعة تفاصيل الدوام
              </p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] text-[#8A9E9E]">جميع تحديثات الجدول تُعرض مباشرة للطبيب</span>
              <span>💚</span>
            </div>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════
          PERIOD DETAIL SHEET
      ════════════════════════════════════ */}
      {activePeriod && !showEditPeriod && (
        <Sheet title="إدارة الفترة" subtitle="يمكنك تعديل أو تكرار أو حذف الفترة المحددة" onClose={() => setActivePeriod(null)}>
          <div className="flex flex-col gap-4">
            <div className={cn('rounded-2xl p-4', activePeriod.period.special ? 'bg-purple-50 border border-purple-100' : 'bg-teal-50 border border-teal-100')}>
              <div className="flex items-center justify-between mb-2">
                <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full',
                  activePeriod.period.special ? 'bg-purple-100 text-purple-600' : 'bg-teal-100 text-teal-primary')}>
                  {activePeriod.period.special ? 'خاص' : 'معتاد'}
                </span>
                <p className={cn('text-[17px] font-bold', activePeriod.period.special ? 'text-purple-700' : 'text-teal-primary')}>
                  {activePeriod.period.label}
                </p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <div className="text-right"><p className="text-[10px] text-[#8A9E9E]">الوقت</p><p className="text-[12px] font-bold text-[#1A2424]">{activePeriod.period.from}–{activePeriod.period.to}</p></div>
                <div className="text-right"><p className="text-[10px] text-[#8A9E9E]">المواعيد</p><p className="text-[12px] font-bold text-[#1A2424]">{activePeriod.period.slots} موعد</p></div>
                <div className="text-right"><p className="text-[10px] text-[#8A9E9E]">مدة الموعد</p><p className="text-[12px] font-bold text-[#1A2424]">كل {activePeriod.period.dur} دق.</p></div>
                <div className="text-right"><p className="text-[10px] text-[#8A9E9E]">التكرار</p><p className="text-[12px] font-bold text-[#1A2424]">متكررة أسبوعياً</p></div>
                <div className="text-right"><p className="text-[10px] text-[#8A9E9E]">الحجز</p><p className="text-[12px] font-bold text-teal-primary">مفعّل للحجز</p></div>
              </div>
            </div>

            <div className="bg-[#F8FAFA] rounded-2xl p-4">
              <p className="text-[13px] font-bold text-[#1A2424] mb-0.5 text-right">إعدادات طرق الحجز</p>
              <p className="text-[11px] text-[#8A9E9E] mb-3 text-right">تختلف هذه الخيارات من فترة إلى أخرى</p>
              <div className="bg-white rounded-xl p-3 border border-[#E8F0F0] flex items-center justify-between mb-3">
                <IcChevronLeft c="w-4 h-4 text-[#B0C4C4]" />
                <div className="text-right">
                  <p className="text-[13px] font-bold text-[#1A2424]">{(activePeriod.period.methods || ['حجز موعد']).join(' · ')}</p>
                  <p className="text-[11px] text-[#8A9E9E]">{activePeriod.period.from}–{activePeriod.period.to} · كل {activePeriod.period.dur} دق. · {activePeriod.period.slots} موعد</p>
                </div>
              </div>
              <button onClick={() => openEdit(activePeriod.period, activePeriod.dayName)}
                className="w-full py-2.5 rounded-xl border border-teal-200 text-teal-primary text-[13px] font-semibold">
                تعديل طرق الحجز
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <button onClick={() => openEdit(activePeriod.period, activePeriod.dayName)}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white border border-[#E8F0F0] shadow-sm">
                <IcChevronLeft c="w-4 h-4 text-[#B0C4C4]" />
                <div className="text-right">
                  <p className="text-[13px] font-bold text-[#1A2424]">تعديل الفترة</p>
                  <p className="text-[11px] text-[#8A9E9E]">تغيير الأوقات أو طرق الحجز</p>
                </div>
              </button>
              <button onClick={() => setActivePeriod(null)}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white border border-[#E8F0F0] shadow-sm">
                <IcChevronLeft c="w-4 h-4 text-[#B0C4C4]" />
                <div className="text-right">
                  <p className="text-[13px] font-bold text-[#1A2424]">تكرار الفترة</p>
                  <p className="text-[11px] text-[#8A9E9E]">نسخها إلى أيام أو أسابيع أخرى</p>
                </div>
              </button>
              <button onClick={() => deletePeriod(activePeriod.dayName, activePeriod.period.label)}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-red-50 border border-red-100">
                <IcChevronLeft c="w-4 h-4 text-red-300" />
                <div className="text-right">
                  <p className="text-[13px] font-bold text-red-500">حذف الفترة</p>
                  <p className="text-[11px] text-red-400">يمكنك تحديد نطاق التكرار لاحقاً</p>
                </div>
              </button>
            </div>
          </div>
        </Sheet>
      )}

      {/* EDIT PERIOD SHEET */}
      {showEditPeriod && activePeriod && (
        <Sheet title="تعديل الفترة" onClose={() => setShowEditPeriod(false)}>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[13px] font-bold text-[#1A2424] text-right mb-2">اختر الأيام</p>
              <DayPicker selected={epDays} setSelected={setEpDays} />
            </div>
            <DetailsBlock name={epName} setName={setEpName} from={epFrom} setFrom={setEpFrom} to={epTo} setTo={setEpTo} dur={epDur} setDur={setEpDur} />
            <RepeatBlock repeat={epRepeat} setRepeat={setEpRepeat} rType={epRepeatType} setRType={setEpRepeatType} />
            <div className="bg-[#F8FAFA] rounded-2xl p-4 flex items-center justify-between">
              <Tog on={epBooking} setOn={setEpBooking} />
              <p className="text-[13px] font-bold text-[#1A2424]">الحجز الإلكتروني مفعّل</p>
            </div>
            {epBooking && (
              <div>
                <p className="text-[13px] font-bold text-[#1A2424] text-right mb-2">إعدادات طرق الحجز</p>
                <MethodCards methods={epMethods} setMethods={setEpMethods} />
              </div>
            )}
            <SummaryCard days={epDays} name={epName || 'الفترة'} from={epFrom} to={epTo} dur={epDur} methods={epMethods} />
            <div className="flex flex-col gap-2 pt-1">
              <Btn onClick={saveEdit}>حفظ وتطبيق</Btn>
              <div className="flex gap-2">
                <button onClick={() => setShowEditPeriod(false)} className="flex-1 py-3 rounded-2xl border border-teal-200 text-teal-primary text-[13px] font-bold">حفظ وتكرار</button>
                <button onClick={() => setShowEditPeriod(false)} className="flex-1 py-3 rounded-2xl border border-[#E0EDED] text-[#374040] text-[13px] font-bold">حفظ كنموذج</button>
              </div>
            </div>
          </div>
        </Sheet>
      )}

      {/* ADD PERIOD SHEET */}
      {showAddPeriod && (
        <Sheet title="إضافة فترة معتادة" onClose={() => setShowAddPeriod(false)}>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[13px] font-bold text-[#1A2424] text-right mb-2">اختر الأيام</p>
              <DayPicker selected={apDays} setSelected={setApDays} />
            </div>
            <DetailsBlock name={apName} setName={setApName} from={apFrom} setFrom={setApFrom} to={apTo} setTo={setApTo} dur={apDur} setDur={setApDur} />
            <RepeatBlock repeat={apRepeat} setRepeat={setApRepeat} rType={apRepeatType} setRType={setApRepeatType} />
            <div className="bg-[#F8FAFA] rounded-2xl p-4 flex items-center justify-between">
              <Tog on={apBooking} setOn={setApBooking} />
              <p className="text-[13px] font-bold text-[#1A2424]">الحجز الإلكتروني مفعّل</p>
            </div>
            {apBooking && (
              <div>
                <p className="text-[13px] font-bold text-[#1A2424] text-right mb-2">إعدادات طرق الحجز</p>
                <MethodCards methods={apMethods} setMethods={setApMethods} />
              </div>
            )}
            <SummaryCard days={apDays} name={apName || 'الفترة'} from={apFrom} to={apTo} dur={apDur} methods={apMethods} />
            <div className="flex flex-col gap-2 pt-1">
              <Btn onClick={addPeriod}>حفظ وتطبيق</Btn>
              <div className="flex gap-2">
                <button onClick={addPeriod} className="flex-1 py-3 rounded-2xl border border-teal-200 text-teal-primary text-[13px] font-bold">حفظ وتكرار</button>
                <button onClick={() => setShowAddPeriod(false)} className="flex-1 py-3 rounded-2xl border border-[#E0EDED] text-[#374040] text-[13px] font-bold">حفظ كنموذج</button>
              </div>
            </div>
          </div>
        </Sheet>
      )}

      {/* ADD SPECIAL PERIOD SHEET */}
      {showAddSpecial && (
        <Sheet title="إضافة فترة خاصة" onClose={() => setShowAddSpecial(false)}>
          <div className="flex flex-col gap-4">
            <div className="bg-purple-50 rounded-2xl p-3.5 border border-purple-100">
              <p className="text-[12px] text-purple-700 leading-relaxed text-right">
                الفترة الخاصة لها أولوية على الجدول المعتاد عند التعارض في نفس التوقيت
              </p>
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#1A2424] text-right mb-2">اليوم</p>
              <DayPicker selected={[spDay]} setSelected={v => setSpDay(v[0] || 'السبت')} multi={false} />
            </div>
            <DetailsBlock name={spName} setName={setSpName} from={spFrom} setFrom={setSpFrom} to={spTo} setTo={setSpTo} dur={spDur} setDur={setSpDur} />
            <div className="bg-[#F8FAFA] rounded-2xl p-4 flex items-center justify-between">
              <Tog on={spBooking} setOn={setSpBooking} />
              <p className="text-[13px] font-bold text-[#1A2424]">الحجز الإلكتروني مفعّل</p>
            </div>
            {spBooking && (
              <div>
                <p className="text-[13px] font-bold text-[#1A2424] text-right mb-2">إعدادات طرق الحجز</p>
                <MethodCards methods={spMethods} setMethods={setSpMethods} />
              </div>
            )}
            <SummaryCard days={[spDay]} name={spName || 'الفترة الخاصة'} from={spFrom} to={spTo} dur={spDur} methods={spMethods} />
            <button onClick={addSpecialPeriod} className="w-full py-3.5 rounded-2xl bg-purple-600 text-white text-[14px] font-bold">
              حفظ وتطبيق لهذا الأسبوع
            </button>
          </div>
        </Sheet>
      )}

      {/* TEMPLATES SHEET */}
      {showTemplates && (
        <Sheet title="النماذج المحفوظة" onClose={() => setShowTemplates(false)}>
          <div className="flex flex-col gap-3">
            {[
              { name: 'جدول العيادة المعتاد', desc: 'صباحي + مسائي · 5 أيام' },
              { name: 'دوام رمضان', desc: 'فترة واحدة · 5 أيام' },
            ].map(t => (
              <div key={t.name} className="bg-white rounded-2xl border border-[#E4EEEE] shadow-sm px-4 py-4 flex items-center gap-3">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="text-[11px] text-red-400 font-semibold border border-red-100 rounded-xl px-3 py-1.5">حذف</button>
                  <button
                    onClick={() => { setPreviewName(t.name); setIsPreviewMode(true); setShowTemplates(false) }}
                    className="text-[11px] text-teal-primary font-semibold border border-teal-200 rounded-xl px-3 py-1.5">معاينة</button>
                </div>
                <div className="text-right flex-1">
                  <p className="text-[14px] font-bold text-[#1A2424]">{t.name}</p>
                  <p className="text-[12px] text-[#8A9E9E] mt-0.5">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Sheet>
      )}

      {/* HOLIDAY SHEET */}
      {showHoliday && (
        <Sheet title="إجازة مجدولة" onClose={() => setShowHoliday(false)}>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[13px] font-bold text-[#1A2424] text-right mb-2">نطاق الإجازة</p>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-[11px] font-semibold text-[#374040] block mb-1 text-right">من تاريخ</label>
                  <input type="date" value={hlFrom} onChange={e => setHlFrom(e.target.value)}
                    className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-3 py-2.5 text-[12px] focus:outline-none focus:border-amber-400" />
                </div>
                <div className="flex-1">
                  <label className="text-[11px] font-semibold text-[#374040] block mb-1 text-right">إلى تاريخ</label>
                  <input type="date" value={hlTo} onChange={e => setHlTo(e.target.value)}
                    className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-3 py-2.5 text-[12px] focus:outline-none focus:border-amber-400" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#1A2424] text-right mb-2">نطاق الإغلاق</p>
              <div className="flex flex-col gap-1.5">
                {([['full', 'اليوم كامل'], ['period', 'فترة محددة']] as const).map(([id, lbl]) => (
                  <button key={id} onClick={() => setHlMode(id)}
                    className={cn('flex items-center gap-3 px-4 py-3 rounded-xl border text-right',
                      hlMode === id ? 'bg-amber-50 border-amber-300' : 'bg-[#F8FAFA] border-[#E0EDED]')}>
                    <div className={cn('w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center',
                      hlMode === id ? 'border-amber-500' : 'border-[#C0D4D4]')}>
                      {hlMode === id && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                    </div>
                    <span className="text-[13px] font-semibold text-[#1A2424]">{lbl}</span>
                  </button>
                ))}
              </div>
            </div>
            {hlFrom && hlTo && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5">
                <p className="text-[12px] font-bold text-amber-700 text-right mb-1">توجد حجوزات مرضى متأثرة</p>
                <p className="text-[11px] text-amber-600 leading-relaxed text-right">
                  يُرجى التواصل مع المرضى المتأثرين يدوياً قبل تأكيد الإجازة. لن يتم إلغاء الحجوزات تلقائياً.
                </p>
              </div>
            )}
            <div>
              <label className="text-[12px] font-semibold text-[#374040] block mb-1.5 text-right">السبب (اختياري)</label>
              <input value={hlReason} onChange={e => setHlReason(e.target.value)} placeholder="مثال: مؤتمر طبي، سفر..."
                className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-amber-400 text-right" />
            </div>
            <button onClick={() => setShowHoliday(false)} className="w-full py-3.5 rounded-2xl bg-amber-500 text-white text-[14px] font-bold">
              {hlFrom && hlTo ? `حفظ وتطبيق من ${hlFrom} إلى ${hlTo}` : 'حفظ وتطبيق'}
            </button>
          </div>
        </Sheet>
      )}

      {/* EMERGENCY SHEET */}
      {showEmergency && (
        <Sheet title="إجازة طارئة" onClose={() => setShowEmergency(false)}>
          <div className="flex flex-col gap-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <p className="text-[13px] font-bold text-red-700 mb-1 text-right">تنبيه مهم</p>
              <p className="text-[12px] text-red-600 leading-relaxed text-right">
                إغلاق الجدول الطارئ لن يُلغي الحجوزات الموجودة تلقائياً. يُرجى التواصل مع المرضى المتأثرين يدوياً.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {([['day', 'إغلاق اليوم بالكامل'], ['period', 'إغلاق فترة محددة']] as const).map(([id, lbl]) => (
                <button key={id} onClick={() => setEmMode(id)}
                  className={cn('flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-right',
                    emMode === id ? 'bg-red-50 border-red-300' : 'bg-[#F8FAFA] border-[#E0EDED]')}>
                  <div className={cn('w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center',
                    emMode === id ? 'border-red-500' : 'border-[#C0D4D4]')}>
                    {emMode === id && <div className="w-2.5 h-2.5 rounded-full bg-red-500" />}
                  </div>
                  <span className="text-[14px] font-semibold text-[#1A2424]">{lbl}</span>
                </button>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5">
              <p className="text-[12px] font-bold text-amber-700 text-right">توجد حجوزات مرضى متأثرة</p>
              <p className="text-[11px] text-amber-600 mt-1 text-right">4 مرضى لديهم مواعيد في هذا اليوم</p>
            </div>
            <button onClick={() => setShowEmergency(false)} className="w-full py-3.5 rounded-2xl bg-red-500 text-white text-[14px] font-bold">
              تأكيد الإغلاق الطارئ
            </button>
          </div>
        </Sheet>
      )}

      {/* LOCATION SHEET */}
      {showLocSheet && (
        <Sheet title="اختر موقع العمل" onClose={() => setShowLocSheet(false)}>
          <div className="flex flex-col gap-2">
            {locations.map(loc => (
              <button key={loc.id} onClick={() => { setLocId(loc.id); setShowLocSheet(false) }}
                className={cn('flex items-center justify-between px-4 py-3.5 rounded-2xl border',
                  locId === loc.id ? 'bg-teal-50 border-teal-primary' : 'bg-white border-[#E8F0F0]')}>
                <div className={cn('w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center',
                  locId === loc.id ? 'border-teal-primary' : 'border-[#C0D4D4]')}>
                  {locId === loc.id && <div className="w-2.5 h-2.5 rounded-full bg-teal-primary" />}
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-bold text-[#1A2424]">{loc.name}</p>
                  <p className="text-[12px] text-[#8A9E9E]">{loc.dept} · {loc.city}</p>
                </div>
              </button>
            ))}
          </div>
        </Sheet>
      )}
    </div>
  )
}

function PatientsScreen({ nav }: { nav: (s: Screen) => void }) {
  const patients = [
    { name: 'محمد عبدالله', last: '7 يناير 2024', visits: '12 زيارة', status: 'نشط' },
    { name: 'سارة أحمد', last: '5 يناير 2024', visits: '8 زيارات', status: 'نشط' },
    { name: 'خالد منصور', last: '3 يناير 2024', visits: '5 زيارات', status: 'نشط' },
    { name: 'نورة سعد', last: '28 ديسمبر', visits: '3 زيارات', status: 'محظور' },
  ]
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <TopBar title="المرضى" dark />
      </div>
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 bg-white border border-[#E8F0F0] rounded-xl px-3 py-2.5 shadow-sm mb-4">
          <IcSearch c="w-4 h-4 text-[#B0C4C4]" />
          <input placeholder="بحث عن مريض..." className="flex-1 bg-transparent text-[13px] text-[#1A2424] placeholder:text-[#B0C4C4] focus:outline-none text-right" />
        </div>
        <div className="flex flex-col gap-2">
          {patients.map((p, i) => (
            <button key={i} onClick={() => nav('patient-controls')} className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm flex items-center justify-between w-full">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <IcUser c="w-5 h-5 text-teal-primary" />
                </div>
                <div className="min-w-0 text-right">
                  <p className="text-[14px] font-bold text-[#1A2424]">{p.name}</p>
                  <p className="text-[12px] text-[#8A9E9E] mt-0.5">{p.visits} · آخر زيارة: {p.last}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge label={p.status} variant={p.status === 'محظور' ? 'error' : 'teal'} />
                <IcChevronLeft c="w-4 h-4 text-[#B0C4C4]" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Messages Screen ────────────────────────────────────────────────────

function MessagesScreen({ nav }: { nav: (s: Screen) => void }) {
  const msgs = [
    { name: 'محمد عبدالله', msg: 'شكراً دكتور على الاستشارة...', time: '10:30', unread: 2 },
    { name: 'إدارة DocGate', msg: 'تذكير: لديك 3 مواعيد غداً', time: 'أمس', unread: 1, admin: true },
    { name: 'سارة أحمد', msg: 'هل يمكن تأجيل الموعد؟', time: 'الأحد', unread: 0 },
    { name: 'خالد منصور', msg: 'وصلت التحاليل، متى نقدر...', time: 'السبت', unread: 0 },
  ]
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <TopBar title="الرسائل" dark />
      </div>
      <div className="flex-1 px-4 pt-4 flex flex-col gap-2">
        {msgs.map((m, i) => (
          <button key={i} className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm flex items-center justify-between w-full">
            <div className="flex items-center gap-3 min-w-0">
              <div className={cn('w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0', m.admin ? 'bg-teal-primary' : 'bg-teal-50')}>
                {m.admin ? <span className="text-white text-[11px] font-bold">DG</span> : <IcUser c="w-6 h-6 text-teal-primary" />}
              </div>
              <div className="min-w-0 text-right">
                <p className="text-[13px] font-bold text-[#1A2424]">{m.name}</p>
                <p className="text-[12px] text-[#8A9E9E] truncate mt-0.5">{m.msg}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[11px] text-[#B0C4C4]">{m.time}</span>
              {m.unread > 0 && (
                <span className="w-5 h-5 bg-teal-primary rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                  {m.unread}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── More Screen ────────────────────────────────────────────────────────

function MoreScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <div className="px-5 pt-2 pb-5">
          <p className="text-white/60 text-[11px] mb-2">إدارة الممارسة</p>
          <div className="flex items-center gap-3">
            <button onClick={() => nav('doctor-profile')} className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <IcUser c="w-8 h-8 text-white" />
            </button>
            <div className="flex-1">
              <p className="text-white text-[16px] font-bold">د. أحمد سالم</p>
              <p className="text-white/70 text-[12px]">استشاري طب الباطنة والجهاز الهضمي</p>
            </div>
            <div className="text-left">
              <span className="bg-white/20 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">ملف 20%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 px-4 py-4 flex flex-col gap-3">
        {/* Profile */}
        <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm">
          <SettingRow icon={<IcUser c="w-5 h-5" />} title="الملف الشخصي" subtitle="المعلومات المهنية والمؤهلات" onClick={() => nav('doctor-profile')} />
        </div>
        {/* Main features */}
        <div>
          <p className="text-[11px] font-bold text-[#8A9E9E] uppercase tracking-wider mb-2 text-right">الممارسة الطبية</p>
          <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm">
            <SettingRow icon={<IcUser c="w-5 h-5" />} title="المرضى" subtitle="سجل المرضى والتحكم" onClick={() => nav('patients')} />
            <Divider />
            <SettingRow icon={<IcBuilding c="w-5 h-5" />} title="مواقع العمل" subtitle="العيادات والمستشفيات" onClick={() => nav('work-locations')} />
            <Divider />
            <SettingRow icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg>} title="المالية والمستحقات" subtitle="الإيرادات والمدفوعات" onClick={() => nav('finance')} />
          </div>
        </div>
        {/* Settings */}
        <div>
          <p className="text-[11px] font-bold text-[#8A9E9E] uppercase tracking-wider mb-2 text-right">الإعدادات</p>
          <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm">
            <SettingRow icon={<IcBell c="w-5 h-5" />} title="الإشعارات" subtitle="تفضيلات الإشعارات" onClick={() => nav('notifications')} />
            <Divider />
            <SettingRow icon={<IcSettings c="w-5 h-5" />} title="الحساب والأمان" subtitle="كلمة المرور والأجهزة" />
            <Divider />
            <SettingRow icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>} title="اللغة" subtitle="العربية" right={<span className="text-[11px] text-[#8A9E9E] bg-[#F0F4F4] rounded-full px-2 py-0.5 font-semibold">AR</span>} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm">
          <SettingRow title="تسجيل الخروج" danger onClick={() => nav('welcome')} right={<></>} />
        </div>
        <p className="text-center text-[11px] text-[#B0C4C4]">DocGate v2.1.0 · جميع الحقوق محفوظة</p>
      </div>
    </div>
  )
}

// ── Forgot Password ────────────────────────────────────────────────────

function ForgotPasswordScreen({ nav }: { nav: (s: Screen) => void }) {
  const [method, setMethod] = useState<'phone' | 'email'>('phone')
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3">
        <button onClick={() => nav('login')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">استعادة كلمة المرور</h1>
        <div className="w-9" />
      </div>
      <div className="flex-1 px-5 pt-4 pb-6 flex flex-col gap-5">
        <div className="bg-teal-50 rounded-2xl p-4 text-right">
          <p className="text-[13px] text-teal-primary font-semibold">سنرسل لك رابط أو رمز استعادة الحساب عبر الوسيلة التي تختارها.</p>
        </div>
        <div className="flex bg-[#F0F4F4] rounded-xl p-1">
          {(['phone', 'email'] as const).map(t => (
            <button key={t} onClick={() => setMethod(t)}
              className={cn('flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all', method === t ? 'bg-white text-teal-primary shadow-sm' : 'text-[#8A9E9E]')}>
              {t === 'phone' ? 'رقم الجوال' : 'البريد الإلكتروني'}
            </button>
          ))}
        </div>
        {method === 'phone' ? (
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#374040]">رقم الجوال</label>
            <div className="flex items-center bg-[#F8FAFA] border border-[#E0EDED] rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-3.5 border-l border-[#E0EDED] text-[13px] font-semibold text-[#374040]">
                <span>🇾🇪</span><span>+967</span>
              </div>
              <input placeholder="5X XXX XXXX" className="flex-1 bg-transparent px-3 py-3.5 text-[14px] placeholder:text-[#B0C4C4] focus:outline-none" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#374040]">البريد الإلكتروني</label>
            <div className="relative">
              <IcMail c="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B0C4C4]" />
              <input type="email" placeholder="example@domain.com" className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl pr-10 pl-4 py-3.5 text-[14px] focus:outline-none focus:border-teal-primary placeholder:text-[#B0C4C4]" />
            </div>
          </div>
        )}
        <Btn onClick={() => nav('recovery-otp')}>
          {method === 'phone' ? 'إرسال رمز واتساب' : 'إرسال رابط الاستعادة'}
        </Btn>
      </div>
    </div>
  )
}

function RecoveryOTPScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3">
        <button onClick={() => nav('forgot-password')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">رمز التحقق</h1>
        <div className="w-9" />
      </div>
      <div className="flex-1 px-5 flex flex-col items-center gap-6 pt-6 pb-6">
        <div className="w-20 h-20 rounded-3xl bg-[#25D366]/10 flex items-center justify-center">
          <IcWhatsApp c="w-11 h-11 text-[#25D366]" />
        </div>
        <div className="text-center">
          <p className="text-[15px] font-semibold text-[#1A2424]">تم إرسال رمز التحقق عبر واتساب</p>
          <p className="text-[14px] text-teal-primary font-bold mt-1">+967 5X XXX XXXX</p>
        </div>
        <div className="flex gap-3 justify-center">
          {['3', '8', '1', '4', '7', '2'].map((d, i) => (
            <div key={i} className="w-12 h-14 bg-teal-50 border-2 border-teal-primary rounded-xl flex items-center justify-center text-[22px] font-bold text-teal-primary">{d}</div>
          ))}
        </div>
        <p className="text-[13px] text-[#8A9E9E]">إعادة الإرسال خلال <span className="text-teal-primary font-bold">01:20</span></p>
        <div className="w-full flex flex-col gap-3 mt-4">
          <Btn onClick={() => nav('account-ready')}>تحقق وإعادة تعيين كلمة المرور</Btn>
          <Btn variant="secondary">إعادة إرسال الرمز</Btn>
        </div>
      </div>
    </div>
  )
}

function AccountReadyScreen({ nav }: { nav: (s: Screen) => void }) {
  // This screen is bypassed in the new onboarding flow (specialty → onboarding-location directly)
  // Kept for the password-reset flow (recovery-otp still references it)
  return (
    <div className="flex-1 flex flex-col bg-white items-center justify-center px-6">
      <StatusBar />
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <IcCheck c="w-12 h-12 text-green-600" />
        </div>
        <div className="text-center">
          <h1 className="text-[22px] font-extrabold text-[#1A2424]">تم تعيين كلمة المرور</h1>
          <p className="text-[14px] text-[#8A9E9E] mt-2">يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.</p>
        </div>
        <div className="w-full flex flex-col gap-3 mt-4">
          <Btn onClick={() => nav('home')}>تسجيل الدخول</Btn>
        </div>
      </div>
    </div>
  )
}

// ── Notifications ──────────────────────────────────────────────────────

function NotificationsScreen({ nav }: { nav: (s: Screen) => void }) {
  const notifs = [
    { icon: '📋', title: 'حجز جديد', body: 'محمد عبدالله حجز موعداً يوم الاثنين 9:30 ص', time: 'الآن', unread: true },
    { icon: '✅', title: 'تم تأكيد الحجز', body: 'سارة أحمد أكدت موعدها لمتابعة', time: '10 د', unread: true },
    { icon: '❌', title: 'تم إلغاء الحجز', body: 'أحمد سالم ألغى موعده الساعة 11:00', time: '45 د', unread: false },
    { icon: '📅', title: 'إعادة جدولة', body: 'طلب إعادة جدولة من خالد منصور', time: 'أمس', unread: false },
    { icon: '👤', title: 'تذكير: إكمال الملف', body: 'أكمل ملفك المهني لزيادة ظهورك للمرضى', time: 'أمس', unread: false },
    { icon: '🏥', title: 'موقع عمل معلق', body: 'مركز الصحة طلب تأكيد انتمائك كطبيب', time: '3 أيام', unread: false },
  ]
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <TopBar title="الإشعارات" onBack={() => nav('home')} dark actions={
          <button className="text-white/70 text-[12px] font-semibold">تحديد الكل</button>
        } />
      </div>
      <div className="flex-1 px-4 pt-4 flex flex-col gap-2">
        {notifs.map((n, i) => (
          <div key={i} className={cn('bg-white rounded-2xl p-4 border shadow-sm flex items-center justify-between gap-3', n.unread ? 'border-teal-200' : 'border-[#E8F0F0]')}>
            <div className="flex items-start gap-3 min-w-0">
              <span className="text-[20px] flex-shrink-0 mt-0.5">{n.icon}</span>
              <div className="min-w-0 text-right">
                <p className="text-[13px] font-bold text-[#1A2424]">{n.title}</p>
                <p className="text-[12px] text-[#8A9E9E] leading-relaxed mt-0.5">{n.body}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[11px] text-[#B0C4C4]">{n.time}</span>
              {n.unread && <div className="w-2 h-2 rounded-full bg-teal-primary flex-shrink-0" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Work Location: Add Choice ──────────────────────────────────────────

function LocationAddChoiceScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <TopBar title="إضافة موقع عمل" onBack={() => nav('work-locations')} dark />
      </div>
      <div className="flex-1 px-5 pt-6 pb-6 flex flex-col gap-4">
        <p className="text-[14px] text-[#5A7070] text-center leading-relaxed">اختر طريقة إضافة موقع العمل</p>
        <button onClick={() => nav('location-search')} className="w-full bg-white rounded-2xl p-5 border border-[#E8F0F0] shadow-sm text-right flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0">
            <IcSearch c="w-6 h-6 text-teal-primary" />
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-bold text-[#1A2424]">البحث عن منشأة موجودة</p>
            <p className="text-[12px] text-[#8A9E9E] mt-0.5">ابحث عن عيادة أو مستشفى مسجل في DocGate</p>
          </div>
          <IcChevronLeft c="w-5 h-5 text-[#B0C4C4]" />
        </button>
        <button className="w-full bg-white rounded-2xl p-5 border border-[#E8F0F0] shadow-sm text-right flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0">
            <IcPlus c="w-6 h-6 text-teal-primary" />
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-bold text-[#1A2424]">إضافة موقع عمل جديد</p>
            <p className="text-[12px] text-[#8A9E9E] mt-0.5">أدخل معلومات العيادة أو المستشفى يدوياً</p>
          </div>
          <IcChevronLeft c="w-5 h-5 text-[#B0C4C4]" />
        </button>
        <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3">
          <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
          <p className="text-[12px] text-blue-700 leading-relaxed text-right">إذا كنت تعمل في منشأة يديرها مزود خدمة DocGate، فسيتولى إضافتك هو تلقائياً.</p>
        </div>
      </div>
    </div>
  )
}

function LocationSearchScreen({ nav }: { nav: (s: Screen) => void }) {
  const results = [
    { name: 'مركز المدينة الطبي', type: 'مركز طبي', city: 'عدن · المنصورة', verified: true },
    { name: 'مستشفى الجمهورية التعليمي', type: 'مستشفى تعليمي', city: 'عدن · خور مكسر', verified: true },
    { name: 'مستشفى 22 مايو', type: 'مستشفى عام', city: 'عدن · المنصورة', verified: true },
    { name: 'مستشفى الصداقة التعليمي', type: 'مستشفى تعليمي', city: 'عدن · الشيخ عثمان', verified: false },
  ]
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <TopBar title="البحث عن منشأة" onBack={() => nav('location-add-choice')} dark />
      </div>
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 bg-white border border-[#E8F0F0] rounded-xl px-3 py-2.5 shadow-sm mb-4">
          <IcSearch c="w-4 h-4 text-[#B0C4C4]" />
          <input placeholder="ابحث باسم المنشأة أو المدينة..." className="flex-1 bg-transparent text-[13px] text-[#1A2424] placeholder:text-[#B0C4C4] focus:outline-none text-right" />
        </div>
        <div className="flex flex-col gap-2">
          {results.map((r, i) => (
            <button key={i} onClick={() => nav('work-locations')} className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm flex items-center gap-3 w-full text-right">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                <IcBuilding c="w-5 h-5 text-teal-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 justify-end">
                  {r.verified && <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-1.5 py-0.5 rounded-full">موثق</span>}
                  <p className="text-[13px] font-bold text-[#1A2424]">{r.name}</p>
                </div>
                <p className="text-[12px] text-[#8A9E9E] mt-0.5">{r.type} · {r.city}</p>
              </div>
              <IcChevronLeft c="w-4 h-4 text-[#B0C4C4]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function LocationInfoScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <TopBar title="معلومات الموقع" onBack={() => nav('work-location-overview')} dark />
      </div>
      <div className="flex-1 px-4 pt-4 pb-6 flex flex-col gap-3">
        <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm">
          <div className="p-4 text-right">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                <IcBuilding c="w-6 h-6 text-teal-primary" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-[#1A2424]">مركز المدينة الطبي</p>
                <p className="text-[12px] text-[#8A9E9E]">مركز طبي</p>
              </div>
            </div>
            {[
              { label: 'العنوان', val: 'شارع المنصورة الرئيسي' },
              { label: 'المدينة', val: 'عدن' },
              { label: 'المنطقة', val: 'المنصورة' },
              { label: 'رقم الهاتف', val: '+967 2 XXX XXXX' },
              { label: 'حالة التوثيق', val: 'موثق ✓' },
              { label: 'حالة العمل', val: 'نشط' },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#F0F4F4] last:border-0">
                <p className="text-[13px] text-[#1A2424] font-medium">{row.val}</p>
                <p className="text-[12px] text-[#8A9E9E]">{row.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#E8F0F0] rounded-2xl h-32 flex items-center justify-center">
          <p className="text-[12px] text-[#8A9E9E]">خريطة الموقع</p>
        </div>
        <Btn onClick={() => nav('work-location-overview')}>تعديل معلومات الموقع</Btn>
      </div>
    </div>
  )
}

// ── Day Editor ─────────────────────────────────────────────────────────

function DayEditorScreen({ nav }: { nav: (s: Screen) => void }) {
  const [isWorking, setIsWorking] = useState(true)
  const [sessions, setSessions] = useState([
    { name: 'الجلسة الأولى', start: '08:00', end: '13:00', duration: 15 },
    { name: 'الجلسة الثانية', start: '17:00', end: '20:00', duration: 30 },
  ])
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <TopBar title="السبت — تعديل اليوم" onBack={() => nav('weekly-schedule')} dark />
      </div>
      <div className="flex-1 px-4 pt-4 pb-4 flex flex-col gap-3">
        {/* Day state toggle */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm">
          <div className="flex items-center justify-between">
            <Toggle on={isWorking} onChange={setIsWorking} />
            <p className="text-[15px] font-bold text-[#1A2424]">{isWorking ? 'يوم عمل' : 'إجازة أسبوعية'}</p>
          </div>
        </div>

        {isWorking && (
          <>
            <div className="flex flex-col gap-2">
              {sessions.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-2">
                      <button onClick={() => nav('session-editor')} className="text-[12px] text-teal-primary font-semibold border border-teal-200 rounded-lg px-2 py-1">تعديل</button>
                      <button onClick={() => setSessions(prev => prev.filter((_, idx) => idx !== i))} className="text-[12px] text-red-500 font-semibold border border-red-200 rounded-lg px-2 py-1">حذف</button>
                    </div>
                    <p className="text-[14px] font-bold text-[#1A2424]">{s.name}</p>
                  </div>
                  <div className="flex items-center justify-between text-right">
                    <div className="flex items-center gap-1 text-[12px] text-[#8A9E9E]">
                      <IcClock c="w-3.5 h-3.5" />
                      <span>{s.duration} دقيقة</span>
                    </div>
                    <p className="text-[15px] font-semibold text-teal-primary">{s.start} – {s.end}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => nav('session-editor')} className="flex items-center justify-center gap-2 border-2 border-dashed border-teal-200 rounded-2xl py-4 text-teal-primary font-semibold text-[14px]">
              <IcPlus c="w-5 h-5" />
              إضافة جلسة
            </button>
          </>
        )}
      </div>
      {/* Unsaved changes bar */}
      <div className="flex-shrink-0 bg-white border-t border-[#E8F0F0] px-4 py-3 flex gap-3">
        <Btn variant="outline" onClick={() => nav('weekly-schedule')} className="flex-1 py-3 text-[13px]">تجاهل التغييرات</Btn>
        <Btn onClick={() => nav('conflict-review')} className="flex-1 py-3 text-[13px]">حفظ التغييرات</Btn>
      </div>
    </div>
  )
}

// ── Conflict Review ────────────────────────────────────────────────────

function ConflictReviewScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-amber-500">
        <StatusBar />
        <TopBar title="مراجعة تعارض المواعيد" onBack={() => nav('day-editor')} />
      </div>
      <div className="flex-1 px-4 pt-4 pb-4 flex flex-col gap-3">
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
          <p className="text-[14px] font-bold text-amber-800 text-right mb-1">تحذير: تعارض في المواعيد</p>
          <p className="text-[12px] text-amber-700 text-right leading-relaxed">
            تغيير الجدول يؤثر على 3 حجوزات موجودة في يوم السبت. يجب مراجعة كل حجز قبل حفظ الجدول.
          </p>
        </div>
        <p className="text-[13px] font-bold text-[#1A2424] text-right">الحجوزات المتأثرة (3)</p>
        {[
          { name: 'محمد عبدالله', time: '08:15 ص', service: 'استشارة عامة', issue: 'خارج الجلسة الجديدة' },
          { name: 'سارة أحمد', time: '09:00 ص', service: 'متابعة', issue: 'تعارض مع وقت الراحة' },
          { name: 'خالد منصور', time: '13:30 م', service: 'فحص دوري', issue: 'بعد نهاية الجلسة' },
        ].map((b, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-red-100 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <Badge label="تعارض" variant="error" />
              <div className="text-right">
                <p className="text-[13px] font-bold text-[#1A2424]">{b.name}</p>
                <p className="text-[12px] text-[#8A9E9E]">{b.service} · {b.time}</p>
              </div>
            </div>
            <p className="text-[12px] text-red-600 text-right mb-3">السبب: {b.issue}</p>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl border border-[#E0EDED] text-[12px] font-semibold text-[#374040]">إلغاء الحجز</button>
              <button className="flex-1 py-2 rounded-xl bg-teal-50 border border-teal-200 text-[12px] font-semibold text-teal-primary">إعادة جدولة</button>
            </div>
          </div>
        ))}
        <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
          <p className="text-[12px] text-red-700 text-right leading-relaxed">لا يمكن حفظ الجدول حتى تتم معالجة جميع التعارضات. لا يوجد تجاوز تلقائي للحجوزات الموجودة.</p>
        </div>
      </div>
      <div className="flex-shrink-0 bg-white border-t border-[#E8F0F0] px-4 py-3 flex gap-3">
        <Btn variant="outline" onClick={() => nav('day-editor')} className="flex-1 py-3 text-[13px]">عودة للتعديل</Btn>
        <Btn disabled className="flex-1 py-3 text-[13px]">حفظ الجدول</Btn>
      </div>
    </div>
  )
}

// ── Date Override ──────────────────────────────────────────────────────

function DateOverrideScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <TopBar title="تخصيص يوم محدد" onBack={() => nav('schedule-30day')} dark />
      </div>
      <div className="flex-1 px-4 pt-4 pb-6 flex flex-col gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm">
          <p className="text-[14px] font-bold text-[#1A2424] text-right mb-1">الثلاثاء، 15 أكتوبر 2026</p>
          <p className="text-[12px] text-[#8A9E9E] text-right">تعديل يوم محدد دون تغيير الجدول الأسبوعي الثابت</p>
        </div>
        <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100">
          <p className="text-[13px] font-bold text-teal-primary text-right mb-2">الجدول الأسبوعي الافتراضي</p>
          <p className="text-[13px] text-[#374040] text-right">08:00 – 13:00 (15 دقيقة)</p>
          <p className="text-[13px] text-[#374040] text-right">17:00 – 20:00 (30 دقيقة)</p>
        </div>
        <p className="text-[13px] font-bold text-[#374040] text-right">تجاوز هذا اليوم بـ</p>
        <div className="flex flex-col gap-2">
          {[
            { label: 'جلسة مختلفة', sub: 'حدد أوقات مختلفة لهذا اليوم فقط', icon: '🕐' },
            { label: 'إجازة استثنائية', sub: 'تعليق العمل في هذا اليوم فقط', icon: '🚫' },
          ].map((opt, i) => (
            <button key={i} onClick={() => nav('day-editor')} className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm flex items-center gap-3 w-full text-right">
              <span className="text-[24px]">{opt.icon}</span>
              <div className="flex-1">
                <p className="text-[14px] font-bold text-[#1A2424]">{opt.label}</p>
                <p className="text-[12px] text-[#8A9E9E]">{opt.sub}</p>
              </div>
              <IcChevronLeft c="w-4 h-4 text-[#B0C4C4]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Booking Checkin ────────────────────────────────────────────────────

function BookingCheckinScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <TopBar title="تسجيل وصول المريض" onBack={() => nav('booking-details')} dark />
      </div>
      <div className="flex-1 px-4 pt-6 pb-6 flex flex-col items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-white/90 border-4 border-teal-200 flex items-center justify-center">
          <IcUser c="w-10 h-10 text-teal-primary" />
        </div>
        <div className="text-center">
          <p className="text-[20px] font-extrabold text-[#1A2424]">محمد عبدالله</p>
          <p className="text-[13px] text-[#8A9E9E] mt-1">استشارة عامة · 09:30 ص</p>
          <p className="text-[12px] text-[#8A9E9E]">مركز المدينة الطبي</p>
        </div>
        <div className="w-full bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm">
          <p className="text-[14px] font-bold text-[#1A2424] text-right mb-3">تفاصيل الحجز</p>
          {[
            { label: 'رقم الحجز', val: '#BK-20461' },
            { label: 'رسوم الخدمة', val: '15,000 ر.ي' },
            { label: 'طريقة الدفع', val: 'بطاقة ائتمانية' },
            { label: 'الحالة', val: 'مؤكد' },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-[#F0F4F4] last:border-0">
              <p className="text-[13px] font-semibold text-[#1A2424]">{r.val}</p>
              <p className="text-[12px] text-[#8A9E9E]">{r.label}</p>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col gap-3 mt-auto">
          <Btn onClick={() => nav('booking-details')}>
            <IcCheck c="w-5 h-5" />
            تأكيد وصول المريض
          </Btn>
          <Btn variant="destructive" onClick={() => nav('booking-cancel')}>
            المريض لم يحضر (غياب)
          </Btn>
        </div>
      </div>
    </div>
  )
}

// ── Booking Cancel ─────────────────────────────────────────────────────

function BookingCancelScreen({ nav }: { nav: (s: Screen) => void }) {
  const [reason, setReason] = useState('')
  const reasons = ['طلب المريض إلغاء الموعد', 'حالة طارئة للطبيب', 'المريض لم يحضر', 'ظرف طارئ في المنشأة', 'سبب آخر']
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3">
        <button onClick={() => nav('booking-details')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">إلغاء الحجز</h1>
        <div className="w-9" />
      </div>
      <div className="flex-1 px-5 pt-2 pb-6 flex flex-col gap-4">
        <div className="bg-red-50 rounded-2xl p-4 border border-red-100 text-right">
          <p className="text-[14px] font-bold text-red-700 mb-1">إلغاء موعد محمد عبدالله</p>
          <p className="text-[12px] text-red-600">الاثنين 9 سبتمبر · 09:30 ص · استشارة عامة</p>
        </div>
        <p className="text-[13px] font-bold text-[#374040] text-right">سبب الإلغاء</p>
        <div className="flex flex-col gap-2">
          {reasons.map(r => (
            <button key={r} onClick={() => setReason(r)}
              className={cn('flex items-center gap-3 rounded-xl border px-4 py-3 text-right w-full transition-all', reason === r ? 'border-teal-primary bg-teal-50' : 'border-[#E0EDED] bg-white')}>
              <div className={cn('w-4 h-4 rounded-full border-2 flex-shrink-0', reason === r ? 'border-teal-primary bg-teal-primary' : 'border-[#B0C4C4]')}>
                {reason === r && <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5" />}
              </div>
              <span className="text-[13px] font-medium text-[#374040]">{r}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#374040]">ملاحظة إضافية (اختياري)</label>
          <textarea rows={3} placeholder="أضف أي ملاحظة..." className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-teal-primary resize-none text-right" />
        </div>
        <div className="mt-auto">
          <Btn variant="destructive" onClick={() => nav('bookings')}>تأكيد الإلغاء</Btn>
        </div>
      </div>
    </div>
  )
}

// ── Reschedule Success ─────────────────────────────────────────────────

function RescheduleSuccessScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-white items-center justify-center px-6">
      <StatusBar />
      <div className="flex-1 flex flex-col items-center justify-center gap-5">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <IcCalendar c="w-12 h-12 text-green-600" />
        </div>
        <div className="text-center">
          <h1 className="text-[20px] font-extrabold text-[#1A2424]">تمت إعادة الجدولة</h1>
          <p className="text-[14px] text-[#8A9E9E] mt-2">تم تحديث موعد محمد عبدالله بنجاح</p>
        </div>
        <div className="bg-teal-50 rounded-2xl p-4 w-full text-center border border-teal-100">
          <p className="text-[13px] text-[#8A9E9E]">الموعد الجديد</p>
          <p className="text-[20px] font-extrabold text-teal-primary mt-1">الاثنين 11 سبتمبر</p>
          <p className="text-[15px] font-bold text-[#374040]">10:00 ص · استشارة عامة</p>
        </div>
        <div className="w-full flex flex-col gap-3 mt-4">
          <Btn onClick={() => nav('booking-details')}>عرض تفاصيل الحجز</Btn>
          <Btn variant="secondary" onClick={() => nav('bookings')}>العودة للحجوزات</Btn>
        </div>
      </div>
    </div>
  )
}

// ── Finance Transactions ────────────────────────────────────────────────

function FinanceTransactionsScreen({ nav }: { nav: (s: Screen) => void }) {
  const transactions = [
    { name: 'أحمد علي', service: 'استشارة عامة', amount: '+15,000 ر.ي', date: '8 سبتمبر · 09:30 ص', type: 'credit' },
    { name: 'سارة محمد', service: 'استشارة تخصصية', amount: '+25,000 ر.ي', date: '8 سبتمبر · 10:00 ص', type: 'credit' },
    { name: 'خالد سالم', service: 'متابعة', amount: '+10,000 ر.ي', date: '7 سبتمبر · 11:15 ص', type: 'credit' },
    { name: 'مبلغ مسترد', service: 'إلغاء حجز', amount: '-15,000 ر.ي', date: '6 سبتمبر', type: 'debit' },
    { name: 'نورة علي', service: 'استشارة عامة', amount: '+15,000 ر.ي', date: '5 سبتمبر · 02:00 م', type: 'credit' },
    { name: 'أحمد محمد', service: 'استشارة مطولة', amount: '+35,000 ر.ي', date: '4 سبتمبر · 09:00 ص', type: 'credit' },
  ]
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <TopBar title="سجل المعاملات" onBack={() => nav('finance')} dark />
      </div>
      <div className="px-4 pt-4">
        <div className="flex gap-2 mb-4">
          {['الكل', 'هذا الشهر', 'الشهر الماضي'].map((f, i) => (
            <button key={i} className={cn('flex-1 py-2 rounded-xl text-[12px] font-semibold border transition-all', i === 1 ? 'bg-teal-primary text-white border-teal-primary' : 'bg-white text-[#8A9E9E] border-[#E0EDED]')}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {transactions.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm flex items-center gap-3">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', t.type === 'credit' ? 'bg-green-50' : 'bg-red-50')}>
                <IcMoney c={cn('w-5 h-5', t.type === 'credit' ? 'text-green-600' : 'text-red-500')} />
              </div>
              <div className="flex-1 text-right">
                <p className="text-[13px] font-semibold text-[#1A2424]">{t.name}</p>
                <p className="text-[11px] text-[#8A9E9E]">{t.service} · {t.date}</p>
              </div>
              <p className={cn('text-[14px] font-bold', t.type === 'credit' ? 'text-green-600' : 'text-red-500')}>{t.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FinancePaymentSettingsScreen({ nav }: { nav: (s: Screen) => void }) {
  const [autoWithdraw, setAutoWithdraw] = useState(false)
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <TopBar title="إعدادات الدفع" onBack={() => nav('finance')} dark />
      </div>
      <div className="flex-1 px-4 pt-4 pb-6 flex flex-col gap-3">
        <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm">
          <div className="p-4 text-right">
            <p className="text-[14px] font-bold text-[#1A2424] mb-3">حساب التحويلات</p>
            <div className="bg-[#F8FAFA] rounded-xl p-3 mb-3">
              <p className="text-[13px] font-bold text-[#1A2424]">بنك اليمن والخليج</p>
              <p className="text-[12px] text-[#8A9E9E] mt-1">رقم الحساب: ••••••••••4821</p>
            </div>
            <button className="text-[13px] text-teal-primary font-semibold">تعديل معلومات الحساب</button>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm">
          <div className="px-4 py-3.5 flex items-center justify-between">
            <Toggle on={autoWithdraw} onChange={setAutoWithdraw} />
            <div className="text-right">
              <p className="text-[14px] font-semibold text-[#1A2424]">صرف تلقائي شهري</p>
              <p className="text-[12px] text-[#8A9E9E]">يتم الصرف في أول كل شهر</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm">
          <div className="p-4 text-right">
            <p className="text-[13px] font-bold text-[#8A9E9E] mb-3">الحد الأدنى للصرف</p>
            <div className="flex gap-2">
              {['50,000 ر.ي', '100,000 ر.ي', '250,000 ر.ي'].map((v, i) => (
                <button key={i} className={cn('flex-1 py-2.5 rounded-xl text-[12px] font-semibold border', i === 1 ? 'bg-teal-primary text-white border-teal-primary' : 'bg-[#F8FAFA] text-[#374040] border-[#E0EDED]')}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Btn>طلب صرف المستحقات الآن</Btn>
      </div>
    </div>
  )
}

// ── Profile Edit Screens ────────────────────────────────────────────────

function ProfileBasicEditScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3">
        <button onClick={() => nav('more')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">المعلومات الأساسية</h1>
        <button className="text-[14px] text-teal-primary font-semibold">حفظ</button>
      </div>
      <div className="flex-1 px-5 pt-2 pb-6 flex flex-col gap-4">
        {/* Avatar */}
        <div className="flex justify-center py-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-teal-50 border-4 border-teal-200 flex items-center justify-center">
              <IcUser c="w-12 h-12 text-teal-primary" />
            </div>
            <button className="absolute bottom-0 left-0 w-8 h-8 bg-teal-primary rounded-full flex items-center justify-center shadow-lg">
              <IcPlus c="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        <InputField label="الاسم الكامل" placeholder="د. أحمد سالم" />
        <InputField label="الاسم بالإنجليزية" placeholder="Dr. Ahmed Al-Shamri" />
        <InputField label="رقم الجوال" placeholder="+967 5X XXX XXXX" icon={<IcPhone c="w-5 h-5" />} />
        <InputField label="البريد الإلكتروني" placeholder="dr.ahmed@example.com" type="email" icon={<IcMail c="w-5 h-5" />} />
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#374040]">نبذة مهنية</label>
          <textarea rows={4} placeholder="اكتب نبذة مختصرة عن تجربتك..." className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-teal-primary resize-none text-right placeholder:text-[#B0C4C4]" />
        </div>
      </div>
    </div>
  )
}

function ProfileProfessionalScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3">
        <button onClick={() => nav('more')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">المعلومات المهنية</h1>
        <button className="text-[14px] text-teal-primary font-semibold">حفظ</button>
      </div>
      <div className="flex-1 px-5 pt-2 pb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#374040]">التخصص الرئيسي</label>
          <select className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-4 py-3.5 text-[14px] text-[#1A2424] focus:outline-none focus:border-teal-primary">
            <option>أمراض باطنية</option>
            <option>طب عام</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#374040]">المسمى المهني</label>
          <div className="flex flex-wrap gap-2">
            {['طبيب عام', 'أخصائي', 'استشاري', 'أستاذ دكتور'].map(t => (
              <button key={t} className={cn('px-4 py-2.5 rounded-xl text-[13px] font-semibold border', t === 'استشاري' ? 'bg-teal-primary text-white border-teal-primary' : 'bg-[#F8FAFA] text-[#374040] border-[#E0EDED]')}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <InputField label="سنوات الخبرة" placeholder="15 سنة" />
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#374040]">اللغات</label>
          <div className="flex gap-2 flex-wrap">
            {['العربية', 'الإنجليزية'].map(l => (
              <span key={l} className="bg-teal-50 text-teal-primary text-[12px] font-semibold px-3 py-1.5 rounded-full border border-teal-100 flex items-center gap-1">
                {l}
                <button className="text-teal-400 font-bold">×</button>
              </span>
            ))}
            <button className="bg-[#F8FAFA] text-[#8A9E9E] text-[12px] font-semibold px-3 py-1.5 rounded-full border border-[#E0EDED]">
              + إضافة
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileLicenseScreen({ nav }: { nav: (s: Screen) => void }) {
  const [uploaded, setUploaded] = useState(false)
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex items-center px-4 py-3">
        <button onClick={() => nav('more')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">الترخيص الطبي</h1>
        <div className="w-9" />
      </div>
      <div className="flex-1 px-5 pt-2 pb-6 flex flex-col gap-4">
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 text-right">
          <p className="text-[13px] text-blue-700 leading-relaxed">يمكنك إضافة تفاصيل ترخيصك الطبي لاحقاً دون الحاجة إلى حظر الوصول لـ DocGate.</p>
        </div>
        <InputField label="الجهة المانحة للترخيص" placeholder="الهيئة السعودية للتخصصات الصحية" />
        <InputField label="رقم الترخيص" placeholder="XXX-XXXXX-X" />
        <InputField label="تاريخ الانتهاء" placeholder="31/12/2028" />
        {!uploaded ? (
          <div className="border-2 border-dashed border-teal-200 rounded-2xl p-6 flex flex-col items-center gap-3 text-center bg-teal-50">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-teal-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
            </div>
            <div>
              <p className="text-[13px] font-bold text-teal-primary">رفع صورة الترخيص</p>
              <p className="text-[11px] text-[#8A9E9E] mt-0.5">PDF · JPG · PNG</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setUploaded(true)} className="bg-white border border-teal-200 rounded-xl px-4 py-2 text-[12px] font-semibold text-teal-primary">رفع ملف</button>
              <button onClick={() => setUploaded(true)} className="bg-white border border-teal-200 rounded-xl px-4 py-2 text-[12px] font-semibold text-teal-primary">التقاط صورة</button>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 rounded-2xl p-4 border border-green-200 flex items-center gap-3">
            <IcCheck c="w-5 h-5 text-green-600" />
            <div className="flex-1 text-right">
              <p className="text-[13px] font-bold text-green-700">تم رفع الترخيص</p>
              <p className="text-[11px] text-green-600">license_document.pdf</p>
            </div>
            <button onClick={() => setUploaded(false)} className="text-[12px] text-red-500 font-semibold">حذف</button>
          </div>
        )}
        <div className="mt-auto flex flex-col gap-3">
          <Btn>حفظ معلومات الترخيص</Btn>
          <button className="text-[13px] text-[#8A9E9E] py-2 font-semibold">إكمال لاحقاً</button>
        </div>
      </div>
    </div>
  )
}

function ProfileQualificationsScreen({ nav }: { nav: (s: Screen) => void }) {
  const quals = [
    { degree: 'بكالوريوس الطب والجراحة', uni: 'جامعة الملك سعود', year: '2005' },
    { degree: 'زمالة أمراض الباطنة', uni: 'البورد العربي', year: '2010' },
    { degree: 'دبلوم طب الطوارئ', uni: 'الهيئة السعودية للتخصصات', year: '2012' },
  ]
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-y-auto">
      <div className="bg-teal-primary">
        <StatusBar dark />
        <TopBar title="المؤهلات والشهادات" onBack={() => nav('more')} dark actions={
          <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/20">
            <IcPlus c="w-5 h-5 text-white" />
          </button>
        } />
      </div>
      <div className="flex-1 px-4 pt-4 pb-6 flex flex-col gap-2">
        {quals.map((q, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-[#E8F0F0] shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                <IcStar c="w-5 h-5 text-teal-primary" />
              </div>
              <div className="min-w-0 text-right">
                <p className="text-[13px] font-bold text-[#1A2424]">{q.degree}</p>
                <p className="text-[12px] text-[#8A9E9E] mt-0.5">{q.uni} · {q.year}</p>
              </div>
            </div>
            <button className="text-[#8A9E9E] flex-shrink-0 mr-1">
              <IcDots c="w-4 h-4" />
            </button>
          </div>
        ))}
        <button className="flex items-center justify-center gap-2 border-2 border-dashed border-teal-200 rounded-2xl py-4 text-teal-primary font-semibold text-[14px] mt-2">
          <IcPlus c="w-5 h-5" />
          إضافة مؤهل أو شهادة
        </button>
      </div>
    </div>
  )
}

// ── Profile Experience ──────────────────────────────────────────────────

function ProfileExperienceScreen({ nav }: { nav: (s: Screen) => void }) {
  const [showAdd, setShowAdd] = useState(false)
  const [exps, setExps] = useState([
    { place: 'مركز المدينة الطبي', role: 'استشاري طب الباطنة', period: '2022 – الآن' },
    { place: 'مستشفى الجمهورية التعليمي', role: 'طبيب باطنة', period: '2019 – 2022' },
    { place: 'مستشفى عدن العام', role: 'طبيب مقيم', period: '2018 – 2019' },
  ])
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-hidden relative">
      <StatusBar />
      <div className="bg-white border-b border-[#E8F0F0] flex items-center px-4 py-3 gap-3">
        <button onClick={() => nav('profile-checklist')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">الخبرات العملية</h1>
        <div className="w-9" />
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 flex flex-col gap-2">
        {exps.map((e, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm p-4 text-right">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <IcBuilding c="w-5 h-5 text-teal-primary" />
                </div>
                <div className="min-w-0 text-right">
                  <p className="text-[14px] font-bold text-[#1A2424]">{e.place}</p>
                  <p className="text-[13px] text-[#374040] mt-0.5">{e.role}</p>
                  <p className="text-[12px] text-[#8A9E9E] mt-1">{e.period}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 items-center flex-shrink-0">
                <button className="text-[11px] text-teal-primary font-semibold">تعديل</button>
                <button className="text-[11px] text-red-400 font-semibold">حذف</button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setShowAdd(true)}
          className="bg-white rounded-2xl border border-dashed border-teal-300 p-4 flex items-center justify-center gap-2 text-teal-primary font-semibold text-[13px]">
          <IcPlus c="w-4 h-4" />
          إضافة خبرة عملية
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E8F0F0] px-4 py-3">
        <Btn onClick={() => nav('profile-checklist')}>حفظ التغييرات</Btn>
      </div>
      {showAdd && (
        <div className="absolute inset-0 bg-black/40 z-20 flex flex-col justify-end" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-t-3xl px-5 pt-5 pb-8 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <button onClick={() => setShowAdd(false)} className="text-[#8A9E9E] text-[13px]">إلغاء</button>
              <h2 className="text-[15px] font-bold text-[#1A2424]">إضافة خبرة عملية</h2>
              <div className="w-10" />
            </div>
            <InputField label="جهة العمل" placeholder="مركز طبي، مستشفى..." />
            <InputField label="المسمى الوظيفي" placeholder="طبيب باطنة، استشاري..." />
            <div className="flex gap-3">
              <InputField label="سنة الانتهاء" placeholder="2024 أو الآن" />
              <InputField label="سنة البداية" placeholder="2020" />
            </div>
            <Btn onClick={() => { setExps(p => [{ place: 'مستشفى جديد', role: 'طبيب باطنة', period: '2024 – الآن' }, ...p]); setShowAdd(false) }}>
              إضافة
            </Btn>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Profile Certificates ────────────────────────────────────────────────

function ProfileCertificatesScreen({ nav }: { nav: (s: Screen) => void }) {
  const [showAdd, setShowAdd] = useState(false)
  const [certs, setCerts] = useState([
    { name: 'زمالة الكلية الملكية للأطباء', org: 'المملكة المتحدة', year: '2021' },
    { name: 'شهادة متقدمة في الجهاز الهضمي', org: 'جامعة عدن', year: '2020' },
  ])
  return (
    <div className="flex-1 flex flex-col bg-[#F0FAF9] overflow-hidden relative">
      <StatusBar />
      <div className="bg-white border-b border-[#E8F0F0] flex items-center px-4 py-3 gap-3">
        <button onClick={() => nav('profile-checklist')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">الشهادات والتدريب</h1>
        <div className="w-9" />
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 flex flex-col gap-2">
        {certs.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E8F0F0] shadow-sm p-4 text-right">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="min-w-0 text-right">
                  <p className="text-[14px] font-bold text-[#1A2424]">{c.name}</p>
                  <p className="text-[12px] text-[#8A9E9E] mt-1">{c.org} · {c.year}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 items-center flex-shrink-0">
                <button className="text-[11px] text-teal-primary font-semibold">تعديل</button>
                <button className="text-[11px] text-red-400 font-semibold">حذف</button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setShowAdd(true)}
          className="bg-white rounded-2xl border border-dashed border-teal-300 p-4 flex items-center justify-center gap-2 text-teal-primary font-semibold text-[13px]">
          <IcPlus c="w-4 h-4" />
          إضافة شهادة
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E8F0F0] px-4 py-3">
        <Btn onClick={() => nav('profile-checklist')}>حفظ التغييرات</Btn>
      </div>
      {showAdd && (
        <div className="absolute inset-0 bg-black/40 z-20 flex flex-col justify-end" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-t-3xl px-5 pt-5 pb-8 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <button onClick={() => setShowAdd(false)} className="text-[#8A9E9E] text-[13px]">إلغاء</button>
              <h2 className="text-[15px] font-bold text-[#1A2424]">إضافة شهادة</h2>
              <div className="w-10" />
            </div>
            <InputField label="اسم الشهادة" placeholder="زمالة، دورة تدريبية..." />
            <InputField label="الجهة المانحة" placeholder="جامعة، هيئة طبية..." />
            <InputField label="سنة الحصول" placeholder="2024" />
            <Btn onClick={() => { setCerts(p => [{ name: 'شهادة جديدة', org: 'جهة التدريب', year: '2024' }, ...p]); setShowAdd(false) }}>
              إضافة
            </Btn>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Schedule Setup Onboarding ──────────────────────────────────────────

function ScheduleSetupScreen({ nav }: { nav: (s: Screen) => void }) {
  // This intermediate screen is now bypassed in the new onboarding flow.
  // OnboardingLocationScreen goes directly to weekly-schedule.
  // Keeping for potential direct navigation from other parts of the app.
  return (
    <div className="flex-1 flex flex-col bg-white">
      <StatusBar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 text-right">
        <div className="w-24 h-24 rounded-3xl bg-teal-50 border-2 border-teal-100 flex items-center justify-center">
          <IcCalendar c="w-12 h-12 text-teal-primary" />
        </div>
        <div className="text-center">
          <h1 className="text-[22px] font-extrabold text-[#1A2424] mb-3">إعداد الجدول</h1>
          <p className="text-[14px] text-[#5A7070] leading-relaxed">حدد أيام وساعات عملك حتى يتمكن المرضى من معرفة المواعيد المتاحة للحجز.</p>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Btn onClick={() => nav('onboarding-location')}>
            <IcCalendar c="w-5 h-5" />
            إعداد الجدول الآن
          </Btn>
          <button onClick={() => nav('home')} className="text-[13px] text-[#8A9E9E] py-2 text-center font-semibold">
            إعداد لاحقاً
          </button>
        </div>
      </div>
    </div>
  )
}

const MOCK_FACILITIES = [
  { name: 'مركز المدينة الطبي', type: 'مركز طبي', city: 'عدن – المنصورة', verified: true },
  { name: 'مستشفى الجمهورية التعليمي', type: 'مستشفى تعليمي', city: 'عدن – خور مكسر', verified: true },
  { name: 'مستشفى عدن العام', type: 'مستشفى عام', city: 'عدن', verified: true },
  { name: 'مستشفى 22 مايو', type: 'مستشفى عام', city: 'عدن – المنصورة', verified: true },
  { name: 'مستشفى الصداقة التعليمي', type: 'مستشفى تعليمي', city: 'عدن – الشيخ عثمان', verified: false },
  { name: 'مركز الصحة الأول', type: 'مركز صحي', city: 'عدن – كريتر', verified: false },
]

function OnboardingLocationScreen({ nav }: { nav: (s: Screen) => void }) {
  const [selected, setSelected] = useState<'existing' | 'new' | null>(null)
  const [showFacilitySearch, setShowFacilitySearch] = useState(false)
  const [facilityQuery, setFacilityQuery] = useState('')
  const [selectedFacility, setSelectedFacility] = useState<{ name: string; type: string; city: string } | null>(null)
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState('')
  const [newCity, setNewCity] = useState('')
  const [newAddress, setNewAddress] = useState('')

  const filteredFacilities = MOCK_FACILITIES.filter(f =>
    facilityQuery.trim() === '' ||
    f.name.includes(facilityQuery) ||
    f.city.includes(facilityQuery)
  )

  const canContinue = selected === 'existing'
    ? !!selectedFacility
    : selected === 'new'
      ? (newName.trim().length > 0 && newType.trim().length > 0 && newCity.trim().length > 0 && newAddress.trim().length > 0)
      : false

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto relative">
      <StatusBar />
      <div className="flex items-center px-4 py-3 border-b border-[#E8F0F0]">
        <button onClick={() => nav('specialty')} className="w-9 h-9 flex items-center justify-center rounded-xl text-[#374040]">
          <IcChevronRight c="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-[#1A2424]">مواقع العمل</h1>
        <div className="w-9" />
      </div>
      <div className="flex-1 px-5 py-6 flex flex-col gap-5 text-right">
        <div>
          <h2 className="text-[18px] font-extrabold text-[#1A2424] mb-1">أين ستستقبل المرضى؟</h2>
          <p className="text-[13px] text-[#8A9E9E]">اختر المنشأة التي ستعمل فيها أولاً لإعداد جدولك.</p>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={() => { setSelected('existing'); setSelectedFacility(null) }}
            className={cn('p-4 rounded-2xl border-2 text-right transition-all flex items-center gap-4',
              selected === 'existing' ? 'border-teal-primary bg-teal-50' : 'border-[#E8F0F0] bg-white')}>
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', selected === 'existing' ? 'bg-teal-primary' : 'bg-[#F0F4F4]')}>
              <IcBuilding c={cn('w-5 h-5', selected === 'existing' ? 'text-white' : 'text-[#8A9E9E]')} />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-bold text-[#1A2424]">اختيار منشأة موجودة</p>
              <p className="text-[12px] text-[#8A9E9E] mt-0.5">ابحث عن مستشفى أو مركز طبي مسجّل في DocGate</p>
            </div>
          </button>
          <button onClick={() => { setSelected('new'); setSelectedFacility(null) }}
            className={cn('p-4 rounded-2xl border-2 text-right transition-all flex items-center gap-4',
              selected === 'new' ? 'border-teal-primary bg-teal-50' : 'border-[#E8F0F0] bg-white')}>
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', selected === 'new' ? 'bg-teal-primary' : 'bg-[#F0F4F4]')}>
              <IcPlus c={cn('w-5 h-5', selected === 'new' ? 'text-white' : 'text-[#8A9E9E]')} />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-bold text-[#1A2424]">إضافة مكان عمل جديد</p>
              <p className="text-[12px] text-[#8A9E9E] mt-0.5">أضف عيادتك أو مكان عملك يدوياً</p>
            </div>
          </button>
        </div>

        {/* Existing facility: show selected or search trigger */}
        {selected === 'existing' && (
          !selectedFacility ? (
            <button
              onClick={() => setShowFacilitySearch(true)}
              className="w-full flex items-center justify-between border-2 border-dashed border-teal-200 rounded-2xl px-4 py-4 bg-teal-50/50 hover:bg-teal-50 transition-all"
            >
              <IcSearch c="w-5 h-5 text-teal-primary" />
              <p className="text-[14px] font-semibold text-teal-primary flex-1 text-right mx-3">ابحث عن منشأة</p>
              <IcChevronLeft c="w-4 h-4 text-teal-primary" />
            </button>
          ) : (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-primary flex items-center justify-center flex-shrink-0">
                <IcBuilding c="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0 text-right">
                <p className="text-[14px] font-bold text-[#1A2424]">{selectedFacility.name}</p>
                <p className="text-[12px] text-[#8A9E9E]">{selectedFacility.type} · {selectedFacility.city}</p>
              </div>
              <button onClick={() => setSelectedFacility(null)} className="text-[12px] text-teal-primary font-semibold border border-teal-200 rounded-lg px-2 py-1 bg-white flex-shrink-0">
                تغيير
              </button>
            </div>
          )
        )}

        {/* New workplace form */}
        {selected === 'new' && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#374040]">اسم المنشأة</label>
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="عيادة د. أحمد سالم" className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-4 py-3.5 text-[14px] text-[#1A2424] placeholder:text-[#B0C4C4] focus:outline-none focus:border-teal-primary" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#374040]">نوع المنشأة</label>
              <input value={newType} onChange={e => setNewType(e.target.value)} placeholder="عيادة خاصة" className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-4 py-3.5 text-[14px] text-[#1A2424] placeholder:text-[#B0C4C4] focus:outline-none focus:border-teal-primary" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#374040]">المدينة</label>
              <input value={newCity} onChange={e => setNewCity(e.target.value)} placeholder="عدن" className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-4 py-3.5 text-[14px] text-[#1A2424] placeholder:text-[#B0C4C4] focus:outline-none focus:border-teal-primary" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#374040]">العنوان</label>
              <input value={newAddress} onChange={e => setNewAddress(e.target.value)} placeholder="المنطقة، الشارع، أقرب معلم" className="w-full bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-4 py-3.5 text-[14px] text-[#1A2424] placeholder:text-[#B0C4C4] focus:outline-none focus:border-teal-primary" />
            </div>
          </div>
        )}

        <Btn disabled={!canContinue} onClick={() => nav('weekly-schedule')} className="mt-auto">
          المتابعة لإعداد الجدول
        </Btn>
      </div>

      {/* Facility Search Modal */}
      {showFacilitySearch && (
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end z-50" onClick={() => setShowFacilitySearch(false)}>
          <div className="bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '75%' }} onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8F0F0]">
              <button onClick={() => setShowFacilitySearch(false)} className="w-8 h-8 flex items-center justify-center rounded-xl text-[#8A9E9E] bg-[#F0F4F4]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <p className="text-[16px] font-bold text-[#1A2424]">اختيار منشأة موجودة</p>
              <div className="w-8" />
            </div>
            {/* Search input */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 bg-[#F8FAFA] border border-[#E0EDED] rounded-xl px-3 py-2.5">
                <IcSearch c="w-4 h-4 text-[#B0C4C4]" />
                <input
                  autoFocus
                  placeholder="ابحث باسم المنشأة أو المدينة"
                  value={facilityQuery}
                  onChange={e => setFacilityQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[13px] text-[#1A2424] placeholder:text-[#B0C4C4] focus:outline-none text-right"
                />
                {facilityQuery && (
                  <button onClick={() => setFacilityQuery('')} className="text-[#B0C4C4]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            </div>
            {/* Results */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {filteredFacilities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 gap-2">
                  <IcBuilding c="w-10 h-10 text-[#D0DEDE]" />
                  <p className="text-[13px] text-[#B0C4C4]">لا توجد نتائج مطابقة</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {filteredFacilities.map((f, i) => (
                    <button key={i}
                      onClick={() => { setSelectedFacility(f); setShowFacilitySearch(false); setFacilityQuery('') }}
                      className="w-full bg-white border border-[#E8F0F0] rounded-2xl p-4 flex items-center gap-3 text-right hover:border-teal-primary hover:bg-teal-50 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                        <IcBuilding c="w-5 h-5 text-teal-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 justify-end">
                          {f.verified && <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-1.5 py-0.5 rounded-full flex-shrink-0">موثق</span>}
                          <p className="text-[13px] font-bold text-[#1A2424] truncate">{f.name}</p>
                        </div>
                        <p className="text-[12px] text-[#8A9E9E] mt-0.5">{f.type} · {f.city}</p>
                      </div>
                      <IcChevronLeft c="w-4 h-4 text-[#B0C4C4] flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ScheduleDoneScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <StatusBar />
      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 py-8 text-center">
        {/* Success icon */}
        <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center">
          <IcCheck c="w-12 h-12 text-teal-primary" />
        </div>
        <div>
          <h1 className="text-[22px] font-extrabold text-[#1A2424] mb-2">تم إعداد حسابك بنجاح</h1>
          <p className="text-[14px] text-[#5A7070] leading-relaxed">
            تم حفظ بياناتك المهنية وموقع العمل وجدول المواعيد.
          </p>
        </div>
        {/* Schedule summary */}
        <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100 w-full text-right">
          <p className="text-[12px] font-bold text-[#8A9E9E] mb-2">ملخص الجدول</p>
          <p className="text-[13px] text-[#374040]">السبت – الخميس · يعمل</p>
          <p className="text-[13px] text-[#374040]">08:00 ص – 01:00 م · 15 دقيقة/موعد</p>
          <p className="text-[13px] text-[#8A9E9E] mt-1">الجمعة · إجازة أسبوعية</p>
        </div>
        {/* Verification pending notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 w-full text-right">
          <div className="flex items-center justify-end gap-2 mb-1.5">
            <p className="text-[14px] font-bold text-amber-800">طلب التوثيق قيد المراجعة</p>
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-[12px] text-amber-700 leading-relaxed">
            سيقوم فريق DocGate بمراجعة بياناتك والوثيقة المرفقة، وسيتم إشعارك عند توثيق حسابك.
          </p>
        </div>
        <div className="w-full flex flex-col gap-3 mt-2">
          <Btn onClick={() => nav('home')}>
            الانتقال إلى لوحة التحكم
          </Btn>
        </div>
      </div>
    </div>
  )
}

// ── Root App ───────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [activeTab, setActiveTab] = useState<NavTab>('home')
  const [onboardingMode, setOnboardingMode] = useState(false)

  const nav = (s: Screen) => {
    setScreen(s)
    if (s === 'register') setOnboardingMode(true)
    if (s === 'welcome' || s === 'login') setOnboardingMode(false)
    if (s === 'home') { setOnboardingMode(false); setActiveTab('home') }
    else if (s === 'bookings' || s === 'booking-details' || s === 'booking-checkin' || s === 'booking-cancel' || s === 'reschedule' || s === 'reschedule-success') setActiveTab('bookings')
    else if (s === 'appointments' || s === 'weekly-schedule' || s === 'schedule-30day' || s === 'day-editor' || s === 'session-editor' || s === 'holiday-block' || s === 'confirmation-policy') setActiveTab('appointments')
    else if (s === 'messages') setActiveTab('messages')
    else if (s === 'more' || s === 'patients' || s === 'patient-controls' || s === 'finance' || s === 'finance-transactions' || s === 'finance-payment-settings' || s === 'profile-basic-edit' || s === 'profile-professional' || s === 'profile-license' || s === 'profile-qualifications' || s === 'profile-experience' || s === 'profile-certificates') setActiveTab('more')
  }

  const onTab = (tab: NavTab) => {
    setActiveTab(tab)
    const tabScreens: Record<NavTab, Screen> = {
      home: 'home',
      bookings: 'bookings',
      appointments: 'appointments',
      messages: 'messages',
      more: 'more',
    }
    setScreen(tabScreens[tab])
  }

  const isAuth = !AUTH_SCREENS.includes(screen)

  const renderScreen = () => {
    switch (screen) {
      case 'welcome': return <WelcomeScreen nav={nav} />
      case 'login': return <LoginScreen nav={nav} />
      case 'register': return <RegisterScreen nav={nav} />
      case 'otp': return <OTPScreen nav={nav} />
      case 'specialty': return <SpecialtyScreen nav={nav} />
      case 'forgot-password': return <ForgotPasswordScreen nav={nav} />
      case 'recovery-otp': return <RecoveryOTPScreen nav={nav} />
      case 'account-ready': return <AccountReadyScreen nav={nav} />
      case 'home': return <HomeScreen nav={nav} />
      case 'notifications': return <NotificationsScreen nav={nav} />
      case 'profile-checklist': return <ProfileChecklistScreen nav={nav} />
      case 'doctor-profile': return <DoctorProfileScreen nav={nav} />
      case 'profile-basic-edit': return <ProfileBasicEditScreen nav={nav} />
      case 'profile-professional': return <ProfileProfessionalScreen nav={nav} />
      case 'profile-license': return <ProfileLicenseScreen nav={nav} />
      case 'profile-qualifications': return <ProfileQualificationsScreen nav={nav} />
      case 'profile-experience': return <ProfileExperienceScreen nav={nav} />
      case 'profile-certificates': return <ProfileCertificatesScreen nav={nav} />
      case 'schedule-setup': return <ScheduleSetupScreen nav={nav} />
      case 'onboarding-location': return <OnboardingLocationScreen nav={nav} />
      case 'schedule-done': return <ScheduleDoneScreen nav={nav} />
      case 'work-locations': return <WorkLocationsScreen nav={nav} />
      case 'work-location-overview': return <WorkLocationOverviewScreen nav={nav} />
      case 'location-add-choice': return <LocationAddChoiceScreen nav={nav} />
      case 'location-search': return <LocationSearchScreen nav={nav} />
      case 'location-info': return <LocationInfoScreen nav={nav} />
      case 'weekly-schedule': return <AppointmentsScreen nav={nav} onboarding={onboardingMode} />
      case 'schedule-30day': return <Schedule30DayScreen nav={nav} />
      case 'day-editor': return <DayEditorScreen nav={nav} />
      case 'conflict-review': return <ConflictReviewScreen nav={nav} />
      case 'date-override': return <DateOverrideScreen nav={nav} />
      case 'session-editor': return <SessionEditorScreen nav={nav} />
      case 'holiday-block': return <HolidayBlockScreen nav={nav} />
      case 'confirmation-policy': return <ConfirmationPolicyScreen nav={nav} />
      case 'services-prices': return <ServicesPricesScreen nav={nav} />
      case 'bookings': return <BookingsScreen nav={nav} />
      case 'booking-details': return <BookingDetailsScreen nav={nav} />
      case 'booking-checkin': return <BookingCheckinScreen nav={nav} />
      case 'booking-cancel': return <BookingCancelScreen nav={nav} />
      case 'reschedule': return <RescheduleScreen nav={nav} />
      case 'reschedule-success': return <RescheduleSuccessScreen nav={nav} />
      case 'patient-controls': return <PatientControlsScreen nav={nav} />
      case 'finance': return <FinanceScreen nav={nav} />
      case 'finance-transactions': return <FinanceTransactionsScreen nav={nav} />
      case 'finance-payment-settings': return <FinancePaymentSettingsScreen nav={nav} />
      case 'appointments': return <AppointmentsScreen nav={nav} onboarding={onboardingMode} />
      case 'weekly-schedule': return <AppointmentsScreen nav={nav} onboarding={onboardingMode} />
      case 'patients': return <PatientsScreen nav={nav} />
      case 'messages': return <MessagesScreen nav={nav} />
      case 'more': return <MoreScreen nav={nav} />
      default: return <HomeScreen nav={nav} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D0ECEC] via-[#E8F5F5] to-[#F0FAF9] flex items-center justify-center p-4">
      <div dir="rtl" className="w-[390px] h-[844px] bg-white rounded-[44px] overflow-hidden shadow-2xl flex flex-col border border-[#C5E0E0]" style={{ boxShadow: '0 32px 80px rgba(11,110,110,0.18), 0 8px 24px rgba(0,0,0,0.08)' }}>
        <div className="flex-1 flex flex-col overflow-hidden">
          {renderScreen()}
        </div>
        {isAuth && !onboardingMode && <BottomNav active={activeTab} onTab={onTab} />}
      </div>
    </div>
  )
}
