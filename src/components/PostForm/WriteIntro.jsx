import { Button } from 'components/common';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WriteIntro = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        $size="lg"
        onClick={() => {
          navigate('/write/type01');
        }}
      >
        생각 일기
      </Button>
      <Button $size="lg" disabled>
        기분 일기(준비중)
      </Button>
      <Button $size="lg" disabled>
        자유(준비중)
      </Button>
    </div>
  );
};

export default WriteIntro;
