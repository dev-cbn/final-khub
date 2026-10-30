import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import styles from './AccountPage.module.css';
import hero from './assets/hero.jpg';

const roles = ['Buyer', 'Seller', 'Provider', 'Driver', 'Job poster'];

export default function AccountPage({ onHome = () => {}, onAccountCreated = () => {} }) {
  const [view, setView] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [role, setRole] = useState('Buyer');
  const [remember, setRemember] = useState(true);
  const [agreed, setAgreed] = useState(true);
  const [email, setEmail] = useState('tomi.adeyemi@example.com');
  const [phone, setPhone] = useState('+234 803 000 1428');
  const [name, setName] = useState('Tomi Adeyemi');
  const [password, setPassword] = useState('TomiMarket2026!');
  const [confirmPassword, setConfirmPassword] = useState('TomiMarket2026!');
  const [code, setCode] = useState(['4', '2', '8', '6', '', '']);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const switchView = (next) => {
    setError('');
    setMessage('');
    setView(next);
  };

  const submit = (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (view === 'signup') {
      if (password.length < 12) return setError('Use at least 12 characters for your password.');
      if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return setError('Include an uppercase letter and a number in your password.');
      if (!agreed) return setError('Please agree to the Terms and Privacy Policy to continue.');
      setMessage('Account details accepted for this demo. Next, verify your phone number.');
      setView('verify');
    } else if (view === 'signin') {
      if (!email.trim() || !password.trim()) return setError('Enter your email or phone number and password.');
      setMessage('This is a frontend demo. Authentication is not connected to a server.');
    } else if (view === 'verify') {
      if (code.some((digit) => !digit)) return setError('Enter all 6 digits of the verification code.');
      setMessage('Demo code accepted. Your number is verified in this preview.');
      onAccountCreated({ name: name.trim() || 'KHUB customer', email: email.trim(), phone: phone.trim(), role });
    } else if (view === 'forgot') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a complete email address, such as name@example.com.');
      setMessage('If an account matches this address, a reset link would be sent. No email was sent by this demo.');
    } else if (view === 'reset') {
      if (password.length < 12) return setError('Use at least 12 characters for your new password.');
      if (password !== confirmPassword) return setError('Your passwords do not match.');
      setMessage('Password updated in this demo preview only.');
    }
  };

  const title = {
    signin: ['Welcome back.', 'Sign in to your everyday hub.'],
    signup: ['Start something good.', 'Create one account. Choose how you’ll use KHUB.'],
    verify: ['Verify your number', 'A little check to keep your account yours.'],
    forgot: ['Let’s get you back in.', 'Reset your password securely.'],
    reset: ['Choose a new password.', 'Make it strong, unique and easy for you to remember.']
  }[view];

  return (
    <div className={styles.page}>
<main className={styles.main}>
        <div className={styles.pageHeading}>
          <span className={styles.eyebrow}>02 / ACCOUNT ACCESS</span>
          <h1>{title[0]}</h1>
          <p>{title[1]}</p>
        </div>

        <div className={styles.columns}>
          <section className={styles.intro}>
            <img className={styles.heroImage} src={hero} alt="A professional working at a laptop in a bright, plant-filled workspace" />
            <h2>One account. More possibilities.</h2>
            <p>Shop a space. Hire a skill. Find your next opportunity. Move through your city with KHUB.</p>
            <div className={styles.notice}>
              <span>Your account, your control</span>
              <p>Manage roles in one place. Verification is separate from advertised listings.</p>
            </div>
          </section>

          <section className={styles.formCard} aria-label="Account form">
            {view === 'verify' && <p className={styles.formLead}>A 6-digit code was sent to {phone.replace(/\d(?=\d{4})/g, '•')}.</p>}
            <form onSubmit={submit} noValidate>
              {view === 'signin' && <>
                <label className={styles.field}><span>Email or phone number</span><input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" placeholder="tomi.adeyemi@example.com" /></label>
                <label className={styles.field}><span>Password</span><div className={styles.passwordInput}><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={16}/> : <Eye size={16}/>} {showPassword ? 'Hide' : 'Show'}</button></div></label>
                <label className={styles.check}><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me on this device</label>
                <button className={styles.primary} type="submit">Sign in</button>
                <button className={styles.textButton} type="button" onClick={() => switchView('forgot')}>Forgot password?</button>
                <div className={styles.notice}><span>Keep your account safe</span><p>KHUB will never ask for your password or OTP in chat.</p></div>
                <button className={styles.secondary} type="button" onClick={() => setMessage('Google sign-in is not connected in this frontend demo.')}>Continue with Google</button>
                <p className={styles.switchText}>New here? <button type="button" onClick={() => switchView('signup')}>Create an account <ArrowRight size={14}/></button></p>
              </>}

              {view === 'signup' && <>
                <label className={styles.field}><span>Full name</span><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required /></label>
                <label className={styles.field}><span>Email address</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></label>
                <label className={styles.field}><span>Phone number</span><input value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" required /><small>We’ll send a verification code.</small></label>
                <div className={styles.roleGroup}><strong>Choose your starting role</strong><div className={styles.roles}>{roles.map((item) => <button type="button" key={item} className={role === item ? styles.roleActive : styles.role} onClick={() => setRole(item)}>{item}</button>)}</div><small>You can add more roles later. Driver and business tools require additional verification.</small></div>
                <label className={styles.field}><span>Create password</span><div className={styles.passwordInput}><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16}/> : <Eye size={16}/>} {showPassword ? 'Hide' : 'Show'}</button></div><small>✓ 12 characters · ✓ Uppercase · ✓ Number</small></label>
                <label className={styles.check}><input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} /> I agree to the Terms and Privacy Policy.</label>
                <button className={styles.primary} type="submit">Create account</button>
                <div className={styles.notice}><span>Already have an account?</span><p>Sign in to continue. You don’t need a separate account for each role.</p></div>
                <p className={styles.switchText}>Already registered? <button type="button" onClick={() => switchView('signin')}>Sign in <ArrowRight size={14}/></button></p>
              </>}

              {view === 'verify' && <>
                <strong className={styles.labelTitle}>Verification code</strong>
                <div className={styles.codeGrid}>{code.map((digit, index) => <input key={index} aria-label={`Verification digit ${index + 1}`} inputMode="numeric" maxLength={1} value={digit} onChange={(e) => setCode((old) => old.map((v, i) => i === index ? e.target.value.replace(/\D/g, '') : v))} />)}</div>
                <small className={styles.muted}>Code expires in 04:32 · Paste supported</small>
                <button className={styles.primary} type="submit">Verify number</button>
                <p className={styles.switchText}>Resend code in 00:28</p>
                <button className={styles.secondary} type="button" onClick={() => switchView('signup')}>Change phone number</button>
                <div className={styles.notice}><span>Only for you</span><p>Never share this code. Support won’t ask you for it.</p></div>
              </>}

              {view === 'forgot' && <>
                <label className={styles.field}><span>Account email</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" /></label>
                <button className={styles.primary} type="submit">Send reset link</button>
                <div className={styles.rule}/>
                <strong className={styles.labelTitle}>After following your reset link</strong>
                <div className={styles.field}><span>New password · Visible example</span><p className={styles.examplePassword}>TomiMarket2026!　 Hide ◉</p><small>✓ At least 12 characters · ✓ Unique password</small></div>
                <label className={styles.field}><span>Confirm new password</span><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></label>
                <button className={styles.secondary} type="button" onClick={() => switchView('reset')}>Update password</button>
                <div className={styles.notice}><span>What happens next</span><p>A valid link lets you set a new password. For privacy, we never confirm whether an email is registered.</p></div>
                <button className={styles.textButton} type="button" onClick={() => switchView('signin')}><ArrowLeft size={14}/> Back to sign in</button>
              </>}

              {view === 'reset' && <>
                <label className={styles.field}><span>New password</span><div className={styles.passwordInput}><input type={showNewPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} /><button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>{showNewPassword ? <EyeOff size={16}/> : <Eye size={16}/>} {showNewPassword ? 'Hide' : 'Show'}</button></div><small>✓ At least 12 characters · ✓ Uppercase · ✓ Number</small></label>
                <label className={styles.field}><span>Confirm new password</span><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></label>
                <button className={styles.primary} type="submit">Update password</button>
                <button className={styles.textButton} type="button" onClick={() => switchView('signin')}><ArrowLeft size={14}/> Back to sign in</button>
              </>}

              {error && <p className={styles.error} role="alert">{error}</p>}
              {message && <div className={styles.success} role="status"><CheckCircle2 size={17}/><span>{message}</span></div>}
              <p className={styles.legal}>By continuing, you agree to KHUB’s Terms and Privacy Policy. Need help? Contact support.</p>
            </form>
          </section>
        </div>
      </main>
      <footer className={styles.footer}><span>© KHUB · Privacy · Terms · Illustrative marketplace content</span><span><button onClick={() => setMessage('Trust & safety support is not connected in this demo.')}>Trust &amp; safety</button>　/　<button onClick={() => setMessage('Contact support is not connected in this demo.')}>Contact support</button></span></footer>
    </div>
  );
}
