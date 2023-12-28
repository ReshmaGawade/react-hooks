import { useNavigate } from "react-router-dom";

export default function Navigations(url){
    const navigate = useNavigate();
    return (
        navigate(url)
    );
}
