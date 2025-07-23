export function ResetPasswordEmail(url: string, email: string) {
  return `
    <div style="font-family:sans-serif; line-height:1.5">
      <h2 style="color:#3b82f6;">Welcome to MyApp!</h2>
      <p>Hello <strong>${email}</strong>,</p>
      <p>Click the link below to verify your email address and activate your account:</p>
      <p><a href="${url}" style="color:white; background:#2563eb; padding:10px 20px; text-decoration:none;">Reset your password</a></p>
      <p style="font-size: 12px; color: #888;">If you didn’t request this, please ignore this email.</p>
    </div>
  `;
}
