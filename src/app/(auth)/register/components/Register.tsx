"use client";

import { useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IRegisterForm, IRegisterProps } from "../page.types";
import {
  Avatar,
  Badge,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CachedTwoToneIcon from "@mui/icons-material/CachedTwoTone";
import Link from "next/link";
import { api } from "@/constants/api";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SAVE_TOKEN } from "@/actions/token.actions";

const Register = ({ profile: defaultProfile }: IRegisterProps) => {
  const router = useRouter();
  const profile = useQuery({
    queryKey: ["REGISTER_PROFILE"],
    queryFn: async () => {
      const result = await axios.get("https://randomuser.me/api/0.4/?lego");
      return result.data;
    },
    initialData: defaultProfile,
  });

  const registerMutation = useMutation({
    mutationKey: ["REGISTER"],
    mutationFn: (data: IRegisterForm) => {
      return api.post("/auth/register", data);
    },
    onSuccess: async ({ data }) => {
      await SAVE_TOKEN(data.accessToken);
      toast.success("Registered successfully, redirecting...");
      router.replace("/");
    },
  });

  const form = useForm<IRegisterForm>({
    defaultValues: {
      username: defaultProfile.results[0].user.username,
      password: defaultProfile.results[0].user.password,
      profile_img: defaultProfile.results[0].user.picture,
    },
  });

  useEffect(() => {
    form.setValue("username", profile.data?.results[0].user.username);
    form.setValue("password", profile.data?.results[0].user.password);
    form.setValue("profile_img", profile.data?.results[0].user.picture);
    form.clearErrors();
  }, [profile.data, form]);

  const handleSubmit = useCallback(
    (data: IRegisterForm) => {
      registerMutation.mutate(data);
    },
    [registerMutation],
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
            <Grid
              xs={12}
              container
              item
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Badge
                badgeContent={
                  <Avatar
                    sx={{
                      width: 26,
                      height: 26,
                      background: (t) => t.palette.background.default,
                    }}
                  >
                    <IconButton
                      size={"small"}
                      onClick={() => profile.refetch()}
                      color={"secondary"}
                    >
                      <CachedTwoToneIcon fontSize={"small"} />
                    </IconButton>
                  </Avatar>
                }
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                {profile.isLoading || profile.isFetching ? (
                  <Avatar
                    variant={"circular"}
                    sx={{
                      width: 96,
                      height: 96,
                      background: (t) => t.palette.background.default,
                    }}
                  >
                    <CircularProgress color={"secondary"} />
                  </Avatar>
                ) : (
                  <Avatar
                    variant={"circular"}
                    src={profile.data?.results[0].user.picture}
                    sx={{ width: 96, height: 96 }}
                  />
                )}
              </Badge>
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
              loading={registerMutation.isPending}
              variant={"contained"}
              fullWidth
              size={"large"}
              type={"submit"}
              color={"secondary"}
            >
              Sign Up
            </LoadingButton>
          </Grid>
          <Typography component={Link} href={"login"} color={"secondary"}>
            already have an account? login
          </Typography>
        </Paper>
      </Grid>
    </Container>
  );
};

export default Register;
