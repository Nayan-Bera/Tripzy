import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/features/otp/otpApiSlice";
import signImage from "@/assets/images/sign/sign.png";
export function OTPForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [cooldown, setCooldown] = useState(0);
  const email = params.get("email") || localStorage.getItem("pending_email");

  /* 🔒 Route guard */
  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);
  const handleResend = async () => {
    if (cooldown > 0) return;

    try {
      await resendOtp({ email }).unwrap();
      alert("OTP sent again to your email");

      // 30s cooldown
      setCooldown(30);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      alert(err?.data?.message || "Failed to resend OTP");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Enter a valid 6-digit OTP");
      return;
    }

    try {
      await verifyOtp({ email, otp }).unwrap();

      // ✅ OTP verified
      localStorage.removeItem("pending_email");
      navigate("/login");
    } catch (err: any) {
      alert(err?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 md:min-h-[450px]", className)}
      {...props}
    >
      <Card className="flex-1 overflow-hidden p-0">
        <CardContent className="grid flex-1 p-0 md:grid-cols-2">
          <form
            className="flex flex-col items-center justify-center p-6 md:p-8"
            onSubmit={handleSubmit}
          >
            <FieldGroup>
              <Field className="items-center text-center">
                <h1 className="text-2xl font-bold">Enter verification code</h1>
                <p className="text-muted-foreground text-sm">
                  We sent a 6-digit code to <b>{email}</b>
                </p>
              </Field>

              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                containerClassName="gap-4"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
              </Button>

              <FieldDescription className="text-center">
                Didn&apos;t receive the code?{" "}
                <span
                  onClick={handleResend}
                  className={cn(
                    "cursor-pointer underline",
                    (isResending || cooldown > 0) &&
                      "opacity-50 pointer-events-none"
                  )}
                >
                  {cooldown > 0
                    ? `Resend in ${cooldown}s`
                    : isResending
                    ? "Sending..."
                    : "Resend"}
                </span>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden md:block">
            <img
              src={signImage}
              alt="OTP verification"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
