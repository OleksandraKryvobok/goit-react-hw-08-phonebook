import styled from "styled-components";

export const List = styled.ul`
    /* width: 400px; */
    font-size: 20px;

    margin: 0;
`;

export const Item = styled.li`
    /* display: flex;
    justify-content: space-between; */

    &:not(:last-child) {
        margin-bottom: 8px;
    }
`;