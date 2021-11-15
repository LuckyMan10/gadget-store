import Styled from 'styled-components';
import notFound from 'assets/images/not_found.gif';

interface ErrorComponentI {
    message: string;
    img: string;
}

const StyledError = Styled.article`
    display: flex;
    justify-content: center;
    margin-top: 100px;
    .wrapper {
        text-align: center;
        h1 {
            margin-top: 20px;
            font-size: 35px;
        }
        img {
            border-radius: 20px;
            max-width: 500px;
        }
        @media (max-width: 550px) {
            img {
                max-width: 250px;
            }
            h1 {
            margin-top: 20px;
            font-size: 25px;
        }
        }
    }
`

export const ErrorComponent = ({message, img}: ErrorComponentI) => {
    return (
        <StyledError>
            <div className="wrapper">
            <img src={img} alt="error" />
            <h1>{message}</h1>
            </div>
        </StyledError>
    )
}