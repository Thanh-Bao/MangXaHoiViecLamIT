import login from '@/api/login';
import registerAPI from '@/api/register';
import { setAccount } from '@/helper/account';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import { useSnackbar } from 'notistack';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import TermAndService from "@/components/policy/termService";
import Box from '@material-ui/core/Box';
import { setMetaAccountCookie } from '@/helper/handleCookie';
import { useDispatch } from 'react-redux';
import { updateLoginStatus } from '@/reduxTookit/slices/postsIndexSlice';

const useStyles = makeStyles(theme => ({
    titleLoginForm: {
        paddingBottom: '0px',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    wrapperLoginForm: {
        paddingTop: '0px !important'
    },
    wrapperLoginActions: {
        padding: '8px 24px'
    },
    button: {
        '&:hover': {
            background: '#3d3d3d'
        }
    },
    submit: {
        marginTop: '12px',
        width: '100%',
        background: '#000000',
        color: 'white'
    },
    contentDialog: {
        maxWidth: '400px'
    },
    errorMessageStyle: {
        backgroundColor: "#fbe6e1",
        fontWeight: 'bold',
        color: '#bf310f'
    },
    centerAlign: {
        display: 'flex',
        justifyContent: 'center'
    },
    TermAndService: { textTransform: 'none', color: 'blue', cursor: 'pointer', fontSize: '0.93em' }
}))

const Login = (props, ref) => {
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();
    const dispatch = useDispatch();

    const { afterLogin = () => { } } = props;

    const { handleSubmit, formState: { errors }, register, control } = useForm();

    const [open, setOpen] = useState(false);
    const [handlingRequest, setHandlingRequest] = useState(false);
    const [actionLogin, setActionLogin] = useState(true);

    const [openTerm, setOpenTerm] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState('none');
    const [errorMessage, setErrorMessage] = useState(null);
    const [acceptPolicy, setAcceptPolicy] = useState(false);


    const MESSAGE = {
        VALIDATE_INPUT: {
            USERNAME: "Tài khoản không được chứa ký tự đặc biệt",
            PASSWORD: "Mật khẩu không được chứa ký tự đặc biệt"
        },
        LOGIN_SUCCESS: "Đăng nhập thành công",
        LOGIN_FAILD: "Đăng nhập thất bại, vui lòng kiểm tra lại",
        REGISTER_SUCCESS: "Đăng ký thành công",
        REGISTER_FAILED: "Đăng ký thất bại, hãy kiểm tra lại",
        NETWORK_ERROR: "Lỗi server, vui lòng thử lại",
        POLICY_DENIED: "Bạn cần đồng ý điều khoản khi đăng ký",
        USERNAME_EXISTS: "Tên tài khoản đã tồn tại",
        PASSWORD_MATCH: "Mật khẩu không khớp",
        USERNAME_MIN: "Tài khoản tối thiểu 5 ký tự",
        USERNAME_MAX: "Tài khoản tối đa 20 ký tự",
        PASSWORD_MIN: "Mật khẩu tối thiểu 3 ký tự",
        PASSSORD_MAX: "Mật khẩu tối đa 50 ký tự"
    }



    // this function passing to TermAndService component via props
    const handleCloseTermAndService = () => {
        setOpenTerm(false);
    }


    useImperativeHandle(ref, () => ({
        open: () => {
            handleOpen();
        }
    }));

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handlleShowErrorMessage = message => {
        setShowErrorMessage(null);
        setErrorMessage(message);
    }

    const validateRegister = (data) => {
        let error = null;
        switch (true) {
            case !/^[a-zA-Z0-9_.-]*$/.test(data.username):
                error = MESSAGE.VALIDATE_INPUT.USERNAME;
                break;
            case !/^[a-zA-Z0-9`~!@#$%^&*()_+-={}\|'";:.>,<\/\[\]]*$/.test(data.password):
                error = MESSAGE.VALIDATE_INPUT.PASSWORD;
                break;
            case !/^.{4,}$/.test(data.username):
                error = MESSAGE.USERNAME_MIN;
                break;
            case !/^.{0,20}$/.test(data.username):
                error = MESSAGE.USERNAME_MAX;
                break;
            case !/^.{3,}$/.test(data.password):
                error = MESSAGE.PASSWORD_MIN;
                break;
            case !/^.{0,50}$/.test(data.password):
                error = MESSAGE.PASSWORD_MIN;
                break;
            default:
                error = null;
                break;
        }

        if (data.password != data.confirmPassword) {
            error = MESSAGE.PASSWORD_MATCH;
        }
        if (!acceptPolicy) {
            error = MESSAGE.POLICY_DENIED;
        }
        return error;
    }

    const onSubmitLogin = (data) => {
        if (!validateUsername(data.username)) {
            enqueueSnackbar(MESSAGE.VALIDATE_INPUT.USERNAME);
        } else if (!validatePassword(data.password)) {
            enqueueSnackbar(MESSAGE.VALIDATE_INPUT.PASSWORD);
        } else {
            setHandlingRequest(true);
            login(data).then(payload => {
                const { statusCode, user, access_token } = payload;

                if (statusCode != 401) {
                    setAccount(access_token, {
                        _id: user._id,
                        username: user.username
                    });

                    afterLogin();
                    handleClose();

                    setShowErrorMessage("none");
                    enqueueSnackbar(MESSAGE.LOGIN_SUCCESS);
                    setMetaAccountCookie(user);
                    dispatch(updateLoginStatus(true));
                }
                else {
                    setShowErrorMessage("none");
                    enqueueSnackbar(MESSAGE.LOGIN_FAILD);
                }

            }).catch(error => { enqueueSnackbar(MESSAGE.LOGIN_FAILD); })
                .finally(() => { setHandlingRequest(false) });
        }
    };

    const onSubmitRegister = (data) => {
        const errorMessage = validateRegister(data);
        if (errorMessage) {
            handlleShowErrorMessage(errorMessage);
        } else {
            setHandlingRequest(true);

            registerAPI(data).then(userCreated => {
                if (userCreated) {
                    setActionLogin(true);
                    setShowErrorMessage("none");
                    enqueueSnackbar(MESSAGE.REGISTER_SUCCESS);
                }
                else {
                    setShowErrorMessage("none");
                    enqueueSnackbar(MESSAGE.USERNAME_EXISTS);

                }

            }).catch(error => { handlleShowErrorMessage(MESSAGE.NETWORK_ERROR); })
                .finally(() => { setHandlingRequest(false) });
        }
    };

    // Thông báo lỗi khi validate, server response lỗi
    const Error = () => {
        return (
            <Box sx={{ mt: 1, mb: 2, py: 1.5, textAlign: 'center', display: showErrorMessage }}
                className={styles.errorMessageStyle}>
                <Box sx={{ mx: 2 }}>
                    <span>{errorMessage}</span></Box>
            </Box >
        );
    }

    //Uility function
    const validateUsername = username => {
        const partern = /^[a-zA-Z0-9_.-]*$/;
        return partern.test(String(username).toLowerCase());
    }
    const validatePassword = password => {
        const partern = /^[a-zA-Z0-9`~!@#$%^&*()_+-={}\|'";:.>,<\/\[\]]*$/;
        return partern.test(String(password));
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            {
                actionLogin == true
                    ?
                    <>
                        <DialogTitle className={styles.titleLoginForm}>
                            Đăng nhập
                        </DialogTitle>

                        <Error />

                        <form className={styles.contentDialog} onSubmit={handleSubmit(onSubmitLogin)} >
                            <DialogContent className={styles.wrapperLoginForm}>
                                <TextField
                                    margin="dense"
                                    id="username"
                                    label="Tài khoản"
                                    fullWidth
                                    {...register("username", {
                                        required: "required"
                                    })}
                                />

                                <TextField
                                    margin="dense"
                                    id="password"
                                    label="Mật khẩu"
                                    type="password"
                                    fullWidth
                                    {...register("password", {
                                        required: "required"
                                    })}
                                />

                                <LoadingButton
                                    type="submit"
                                    className={styles.submit}
                                    color="primary"
                                    loading={handlingRequest}
                                    disabled={handlingRequest}
                                    classes={{
                                        root: styles.button,
                                    }}
                                >
                                    Đăng nhập
                                </LoadingButton>
                            </DialogContent>

                            <DialogActions className={styles.wrapperLoginActions}>
                                <Button onClick={() => { setActionLogin(false); setShowErrorMessage('none') }} color="primary" size='small' disabled={handlingRequest}>
                                    Tạo tài khoản?
                                </Button>
                            </DialogActions>
                        </form>
                    </>
                    :
                    <>
                        <DialogTitle className={styles.titleLoginForm}>
                            Tạo tài khoản
                        </DialogTitle>

                        <form className={styles.contentDialog} onSubmit={handleSubmit(onSubmitRegister)} >

                            <Error />

                            <DialogContent className={styles.wrapperLoginForm}>
                                <TextField
                                    margin="dense"
                                    id="username"
                                    label="Tài khoản"
                                    helperText="Chỉ có ký tự chữ thường, hoa, số, không chứa ký tự đặc biệt, không khoảng trắng."
                                    onChange={() => console.log("HÀM NÀY KHÔNG CHẠY")} // onChange bị lỗi rồi!
                                    FormHelperText
                                    {...register("username", {
                                        required: "required"
                                    })}
                                />

                                <TextField
                                    margin="dense"
                                    id="password"
                                    label="Mật khẩu"
                                    onChange={() => console.log("HÀM NÀY KHÔNG CHẠY")} // onChange bị lỗi rồi!
                                    type="password"
                                    fullWidth
                                    {...register("password", {
                                        required: "required"
                                    })}
                                />

                                <TextField
                                    margin="dense"
                                    id="confirmpassword"
                                    label="Mật khẩu"
                                    onChange={() => console.log("HÀM NÀY KHÔNG CHẠY")} // onChange bị lỗi rồi!
                                    type="password"
                                    fullWidth
                                    {...register("confirmPassword", {
                                        required: "required",
                                    })}
                                />

                                <div className={styles.centerAlign}>
                                    <div>
                                        <Checkbox
                                            checked={acceptPolicy}
                                            onChange={() => { setAcceptPolicy(!acceptPolicy) }}
                                        />
                                        Đồng ý các <b><span
                                            onClick={() => setOpenTerm(true)}
                                            className={styles.TermAndService}>
                                            điều khoản & dịch vụ</span></b>
                                    </div>
                                </div>

                                <TermAndService openTerm={openTerm} onCloseTermAndService={handleCloseTermAndService} />

                                <LoadingButton
                                    type="submit"
                                    className={styles.submit}
                                    color="primary"
                                    loading={handlingRequest}
                                    disabled={handlingRequest}
                                    classes={{
                                        root: styles.button,
                                    }}
                                >
                                    Đăng ký tài khoản
                                </LoadingButton>
                            </DialogContent>

                            <DialogActions className={styles.wrapperLoginActions}>
                                <Button onClick={() => { setActionLogin(true); setShowErrorMessage('none') }} color="primary" size='small' disabled={handlingRequest}>
                                    Đã có tài khoản?
                                </Button>

                            </DialogActions>
                        </form>
                    </>
            }

            {handlingRequest && <LinearProgress />}

        </Dialog >
    )
}

export default forwardRef(Login);