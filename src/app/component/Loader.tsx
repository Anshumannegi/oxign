
import React from 'react';
import { css } from '@emotion/react';
import { PacmanLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = (props: any) => {
  const { className, ...restProps } = props;

  return (
    <div className={`loader-container ${className}`} css={override} {...restProps}>
      <PacmanLoader color="#36D7B7" loading={true} size={30} />
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default Loader;


