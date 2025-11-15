import { useRouteError } from "react-router-dom";
import { Container, Title, Subtitle, Message, HomeLink } from "./ErrorPage.styles";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error); // for debugging

    return (
        <Container>
            <Title>😵‍💫 Oops!</Title>
            <Subtitle>{error?.statusText || "Page not found"}</Subtitle>
            <Message>{error?.message || "The page you are looking for doesn’t exist."}</Message>
            <HomeLink to="/">Go Back Home</HomeLink>
        </Container>
    );
}
