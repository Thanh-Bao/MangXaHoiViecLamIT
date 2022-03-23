import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Cookies from 'universal-cookie';
import Tooltip from '@mui/material/Tooltip';
import { color } from "@mui/system";
import TermAndService from "@/components/policy/termService";

const options = [
    {
        policyId: 1,
        label: 'Đồng ý cho website truy cập và sử dụng cookie.'
    },
    {
        policyId: 2,
        label: 'Đồng ý xem nội dung kinh dị, máu me.'
    },
    {
        policyId: 3,
        label: 'Xác nhận bạn đã trên 18 tuổi.'
    },
    {
        policyId: 4,
        label: 'Chúng tôi hoàn toàn không chịu trách nhiệm về nội dung bạn truy cập và các vấn đề liên quan.'
    },
    {
        policyId: 5,
        label: ''
    },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2)
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1)
    }
}));



const ConsentPolicy = () => {
    const [open, setOpen] = useState(true);
    const [checkedState, setCheckedState] = useState(
        new Array(options.length).fill(true)
    );
    const [total, setTotal] = useState(15);

    const [openTerm, setOpenTerm] = useState(false);

    // this function passing to TermAndService component via props
    const handleCloseTermAndService = () => {
        setOpenTerm(false);
    }


    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);

        const totalPrice = updatedCheckedState.reduce(
            (sum, currentState, index) => {
                if (currentState === true) {
                    return sum + options[index].policyId;
                }
                return sum;
            }, 0
        );

        setTotal(totalPrice);
        console.log(total)
    };
    const cookies = new Cookies();
    const handleOk = () => {
        cookies.set('ACCEPT_POLICY', true, { path: '/', expires: new Date(Date.now() + 30 * 24 * 60 * 50000) }); // thời hạn 30 ngày
        setOpen(false);
    };

    var listItem = [];
    for (let index = 0; index < options.length - 1; index++) {
        listItem.push(
            <div key={index}>
                <Checkbox checked={checkedState[index]} onChange={() => handleOnChange(index)} />
                {options[index].label}
            </div>
        )
    }

    return (
        <div>
            <BootstrapDialog
                open={open}
                style={{ backgroundColor: 'black' }}
            >
                <DialogTitle sx={{
                    m: 0, p: 2, display: 'flex',
                    justifyContent: 'center',
                }}>
                    ĐỒNG Ý ĐIỀU KHOẢN DỊCH VỤ
                </DialogTitle>
                <DialogContent dividers>
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup >

                            {listItem}
                            <div>
                                <Checkbox checked={checkedState[4]} onChange={() => handleOnChange(4)} />
                                Đồng ý với các <b><span
                                    onClick={() => setOpenTerm(true)}
                                    style={{ textTransform: 'none', color: 'blue', cursor: 'pointer' }}>
                                    điều khoản và dịch vụ</span></b>
                            </div>

                        </FormGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>

                    <Button
                        variant="contained"
                        style={total === 15 ? { backgroundColor: 'black' } : null} // 15 là tổng ID
                        onClick={handleOk}
                        disabled={total === 15 ? false : true}
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </BootstrapDialog>

            <TermAndService openTerm={openTerm} onCloseTermAndService={handleCloseTermAndService} />

        </div>
    );
}

export default ConsentPolicy;