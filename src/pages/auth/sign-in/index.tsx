import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import CardWrapper from "@/components/card-wrapper";
import { useAppStore } from "@/store/use-app-store";
import toast from "react-hot-toast";

interface SignInForm {
  email: string;
  password: string;
}

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAppStore();

  const form = useForm<SignInForm>({
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = async (data: SignInForm) => {
    const { email, password } = data;

    if (!email || !password) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const role = await login(email, password);

      if (role) {
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          setError("Unknown user role");
        }
      } else {
        toast.error("Invalid email or password");
        setError("Invalid email or password");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");

      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-dvh relative flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-lg flex gap-4 flex-col items-center justify-center w-full px-4">
        <CardWrapper className="w-full p-2 border border-border z-20">
          <div className="rounded-lg p-6">
            <p className="text-lg font-bold mb-6">Sign In to your account</p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            {...field}
                            className="pl-10 py-5"
                            required
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                          <Input
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="pl-10 pr-10 py-5"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="outline"
                  className="w-full mt-4 rounded-3xl"
                >
                  Sign In
                </Button>
              </form>
            </Form>
          </div>
        </CardWrapper>
      </div>
    </section>
  );
};

export default SignInPage;
