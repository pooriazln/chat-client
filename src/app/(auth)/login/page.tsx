"use client";

import { Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ILoginForm } from "@/app/(auth)/login/page.types";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/constants/api";
import { SAVE_TOKEN } from "@/actions/token.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IRegisterForm } from "@/app/(auth)/register/page.types";

export default function LoginPage() {
  const form = useForm<ILoginForm>();
  const router = useRouter();
  const loginMutation = useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: (data: ILoginForm) => {
      return api.post("/auth/login", data);
    },
    onSuccess: async ({ data }) => {
      await SAVE_TOKEN(data.accessToken);
      toast.success("Logged in successfully, redirecting...");
      router.replace("/");
    },
  });

  const handleSubmit = useCallback(
    (data: IRegisterForm) => loginMutation.mutate(data),
    [loginMutation],
  );

  return (
    <Container maxWidth={"md"}>
      <Grid
        container
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Paper sx={{ p: 4 }}>
          <Grid
            container
            gap={4}
            mb={1}
            component={"form"}
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Grid item xs={12}>
              <Typography
                variant={"h3"}
                fontWeight={500}
                textAlign={"center"}
                color={"secondary"}
              >
                Welcome Back
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={"Username"}
                fullWidth
                {...form.register("username", {
                  required: "username is required",
                })}
                value={form.watch("username") || ""}
                error={Boolean(form.formState.errors.username)}
                helperText={form.formState.errors.username?.message}
                color={"secondary"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={"Password"}
                fullWidth
                {...form.register("password", {
                  required: "password is required",
                })}
                value={form.watch("password") || ""}
                error={Boolean(form.formState.errors.password)}
                helperText={form.formState.errors.password?.message}
                color={"secondary"}
              />
            </Grid>

            <LoadingButton
              loading={loginMutation.isPending}
              variant={"contained"}
              fullWidth
              size={"large"}
              type={"submit"}
              color={"secondary"}
            >
              Sign In
            </LoadingButton>
          </Grid>
          <Typography component={Link} href={"register"} color={"secondary"}>
            dont have an account? register now
          </Typography>
        </Paper>
      </Grid>
    </Container>
  );
}
