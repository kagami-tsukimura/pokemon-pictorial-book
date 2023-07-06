import './Button.css';

export const Button = ({ handlePrevPage, handleNextPage }) => {
  return (
    <div className='btn'>
      <button onClick={handlePrevPage}>前へ</button>
      <button onClick={handleNextPage}>次へ</button>
    </div>
  );
};
