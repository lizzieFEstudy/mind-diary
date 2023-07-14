import { JoinBox, JoinRow } from 'components/User/Join.styled';
import { Button, ButtonBox } from 'components/common/Button';
import { Input } from 'components/common/Input';
import { isPassword } from 'components/common/validator';
import { auth, storage } from 'config/firebase';
import { DEFAULT_URL } from 'constants/user';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import useInput from 'hooks/useInput';
import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const navigate = useNavigate();

  const [email, onChangeEmailHandler] = useInput();
  const [password, setPassword] = useInput();
  const [passwordConfirm, setPasswordConfirm] = useInput();
  const [nickname, onChangeNicknameHandler] = useInput();

  const [emailError, setEmailError] = useState('');
  const [passWordError, setPassWordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  // Ref 체크
  const [refSuccess, setRefSuccess] = useState({
    // emailRef: false,
    passwordRef: false,
    passwordConfirmRef: false
    // nicknameRef: false,
  });
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // 파일 업로드
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(DEFAULT_URL);

  const signUp = async (event) => {
    event.preventDefault();

    console.log('refSuccess => ', refSuccess);
    // if (Object.values(refSuccess).includes(false)) return;

    const keysOfFormSuccess = Object.keys(refSuccess);
    const falseRef = keysOfFormSuccess.find((key) => refSuccess[key] === false);

    console.log('1 => ', refSuccess);
    console.log('2 => ', falseRef);

    if (falseRef) return eval(falseRef).current.focus();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Signed in
      const user = userCredential.user;

      // 파이어스토어에 이미지 전달
      let downloadURL = DEFAULT_URL;
      if (selectedFile) {
        const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
        await uploadBytes(imageRef, selectedFile);
        downloadURL = await getDownloadURL(imageRef);
      }

      await updateProfile(auth.currentUser, {
        displayName: nickname,
        photoURL: downloadURL
      });

      console.log('user with signUp', user);
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signUp', errorCode, errorMessage);
    }
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      switch (name) {
        case 'email':
          onChangeEmailHandler(e);
          break;
        case 'password':
          if (isPassword(value, { min: 8 })) {
            setPassWordError('');
            // setPassWordSuccess(true);
            setRefSuccess({ ...refSuccess, passwordRef: true });
          } else {
            setPassWordError('비밀번호는 영문, 숫자 조합 8자리 이상 입력해야 합니다.');
            // setPassWordSuccess(false);
            setRefSuccess({ ...refSuccess, passwordRef: false });
          }

          setPassword(e);
          break;
        case 'passwordConfirm':
          if (password === value) {
            setPasswordConfirmError('');
            // setPasswordConfirmSuccess(true);
            setRefSuccess({ ...refSuccess, passwordConfirmRef: true });
          } else {
            setPasswordConfirmError('입력한 비밀번호와 동일하지 않습니다.');
            // setPasswordConfirmSuccess(false);
            setRefSuccess({ ...refSuccess, passwordConfirmRef: false });
          }
          setPasswordConfirm(e);
          break;
        default:
      }
    },
    [password]
  );

  // 파일 업로드
  const handleFileSelect = (event) => {
    const theFile = event.target.files[0];

    setSelectedFile(theFile);

    if (theFile) {
      // 프로필이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result }
        } = finishedEvent;
        setPreviewImg(result);
      };
      reader.readAsDataURL(theFile);
    } else {
      setPreviewImg(DEFAULT_URL);
    }
  };

  return (
    <JoinBox>
      <form>
        <JoinRow>
          <label>이메일</label>
          <div>
            <Input type="email" value={email} name="email" onChange={handleChange} required />
            <small>{emailError}</small>
          </div>
        </JoinRow>
        <JoinRow>
          <label>비밀번호</label>
          <div>
            <Input
              type="password"
              ref={passwordRef}
              value={password}
              name="password"
              onChange={handleChange}
              placeholder="영문, 숫자 조합 8자리 이상 입력"
              required
            />
            <small>{passWordError}</small>
          </div>
        </JoinRow>
        <JoinRow>
          <label>비밀번호 확인</label>
          <div>
            <Input
              type="password"
              ref={passwordConfirmRef}
              value={passwordConfirm}
              name="passwordConfirm"
              onChange={handleChange}
              placeholder="비밀번호 확인"
              required
            />
            <small>{passwordConfirmError}</small>
          </div>
        </JoinRow>

        <JoinRow>
          <label>닉네임</label>
          <div>
            <Input type="text" value={nickname} name="nickname" onChange={onChangeNicknameHandler} />
          </div>
          {/* <small>info: {nicknameConfirmError}</small> */}
        </JoinRow>
        <JoinRow>
          <label>프로필사진</label>
          <div>
            <input type="file" onChange={handleFileSelect} />
            <div>
              <img src={previewImg} alt="프로필 사진" />
            </div>
          </div>
        </JoinRow>
        <ButtonBox>
          <Button onClick={signUp}>회원가입</Button>
        </ButtonBox>
      </form>
    </JoinBox>
  );
};

export default Join;
