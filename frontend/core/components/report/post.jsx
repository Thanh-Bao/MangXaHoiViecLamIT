

import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { Flag } from '@mui/icons-material';
import { Tooltip, IconButton, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';


const useStyles = makeStyles((theme) => ({
  pointer: { cursor: 'pointer' },
  otherReport: { width: '100%' }
}));

const options = [
  {
    violateCode: "POLITICAL_RELIGION",
    lable: 'Liên quan đến tôn giáo, chính trị'
  },

  {
    violateCode: "PROFANITY",
    lable: 'Ngôn từ thô tục, từ ngữ tục tĩu'
  },
  {
    violateCode: "RACISM",
    lable: 'Phân biệt chủng tộc, vùng miền'
  },
  {
    violateCode: "VIOLENCE",
    lable: 'Cổ súy, kích động bạo lực'
  },

  {
    violateCode: "OFFENSE",
    lable: 'Xúc phạm người khác'
  },

  {
    violateCode: "FAKE_NEWS",
    lable: 'Thông tin sai sự thật'
  },
  {
    violateCode: "SEXUAL",
    lable: 'Nội dung khiêu dâm'
  },
  {
    violateCode: "DUPLICATE",
    lable: 'Bài viết trùng lặp'
  },
  {
    violateCode: "SPAM",
    lable: 'Spam'
  },
  {
    violateCode: "OTHER",
    lable: 'Khác'
  },
];

const centerAlignStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const ConfirmationDialogRaw = props => {
  const classes = useStyles();

  const { onClose, value: valueProp, open, ...other } = props;
  const [policyIdSelected, setValueSelected] = useState(valueProp);
  const [disableSendBtn, setDisableSendBtn] = useState(true);
  const [showTextField, setShowTextField] = useState(false);
  const [showErrorTextField, setShowErrorTextField] = useState(false);
  const [description, setDescription] = useState("");
  const radioGroupRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!open) {
      setValueSelected(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  function handleInputChange(e) {
    setDescription(e.target.value);
    if (description.length >= 10) {
      setShowErrorTextField(false)
    }
    if (description.length >= 2) {
      setDisableSendBtn(false);
    } else {
      setDisableSendBtn(true);
    }
  }


  function _getLabelByViolateID(violateCode) {
    return options.filter(
      function (options) { return options.violateCode == violateCode }
    )[0].lable;
  }

  const handleOk = () => {
    if (description.length >= 10 && policyIdSelected == "OTHER" || policyIdSelected != "OTHER") {
      onClose(policyIdSelected);
      try {
        // AXIOS POST
        var data = {
          "Code": policyIdSelected,
          "label": _getLabelByViolateID(policyIdSelected),
          "postId": props.postId,
          "description": description,
          // "reporter": JSON.parse(localStorage.getItem("_meta_user_gore"))
        }
        console.log(data);
        setDescription("");
        enqueueSnackbar('Cảm ơn bạn đã báo cáo bài viết!');
      } catch {
        enqueueSnackbar('Lỗi báo cáo bài viết, vui lòng thử lại sau!');
      }
    } else {
      setShowErrorTextField(true);
    }
  };

  const handleSelectionChange = (event) => {
    if (event.target.value == "OTHER") {
      setShowTextField(true);
      if (description.length < 2) {
        setDisableSendBtn(true);
      }
    } else {
      setShowTextField(false);
      setDisableSendBtn(false);
      setDescription("");
    }
    setValueSelected(event.target.value);

  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle
        sx={centerAlignStyle}
      >Bài viết này vi phạm nguyên tắc nào?</DialogTitle>
      <DialogContent dividers
        className={"scrollbar"}
      >
        <RadioGroup
          ref={radioGroupRef}
          aria-label="violate"
          name="violate"
          value={policyIdSelected}
          onChange={handleSelectionChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option.violateCode}
              key={option.violateCode}
              control={<Radio />}
              label={option.lable}
            />
          ))}
        </RadioGroup>
        {showTextField ?
          <TextField
            className={classes.otherReport}
            autoFocus={true}
            onChange={handleInputChange}
            error={showErrorTextField}
            helperText="Tối thiểu 10 ký tự"
            label={"Nội dung vi phạm"} /> : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>HỦY</Button>
        <Button disabled={disableSendBtn} variant="contained" onClick={handleOk}>GỬI</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

const FocusLogin = props => {

  const handleOK = () => {
    props.onClose();
  };

  return (
    <>
      <Dialog
        open={props.open}
      >
        <DialogContent>
          <DialogContentText style={{ color: 'black' }}>
            Bạn cần đăng nhập để báo cáo bài viết này.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={centerAlignStyle}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: 'black' }}
            onClick={handleOK}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const ReportPost = (props) => {
  const classes = useStyles();

  const [openReportChoose, setOpenReportChoose] = useState(false);
  const [openFocusLogin, setFocusLogin] = useState(false);
  const [logined, setLogined] = useState(true);

  const handleClickFlag = () => {
    if (logined) {
      setOpenReportChoose(true);
    } else {
      setFocusLogin(true);
    }
  };

  const handleCloseReportChoose = () => {
    setOpenReportChoose(false);

  };

  // this function passing to FocusLogin component via props
  const handleCloseFocusLogin = () => {
    setFocusLogin(false);
  }

  return (
    <>
      <IconButton component="span" size='small' onClick={handleClickFlag}>
        <Tooltip title="Báo cáo" aria-label="report">
          < Flag className={classes.pointer} />
        </Tooltip>
      </IconButton>
      <ConfirmationDialogRaw
        username={props.username}
        postId={props.postId}
        keepMounted
        open={openReportChoose}
        onClose={handleCloseReportChoose}
        value=""
      />
      <FocusLogin
        open={openFocusLogin}
        onClose={handleCloseFocusLogin}
      />
    </>
  );
}

export default ReportPost;