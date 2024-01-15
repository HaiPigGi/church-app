import "@testing-library/jest-dom";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Fragments/Navbar";
import "intersection-observer";
import { MemoryRouter } from "react-router-dom";

describe("Navbar Component", () => {
    it("Logo Image", () => {
        render(<Navbar/>);
        const image = screen.getByAltText("logo gereja");
        expect(image).toBeInTheDocument();

        userEvent.click(image);

        waitFor(()=>{
            expect(window.location.pathname).toBe("/");
        })

    })

    it("navLinkForum", () => {
        render(
        <MemoryRouter>
            <Navbar/>
        </MemoryRouter>
        );
        const nalink = screen.getByTestId(/kritik & saran/i);
        expect(nalink).toBeInTheDocument();

        userEvent.click(nalink);

        waitFor(() => {
            expect(window.location.pathname).toBe("/pages/saran");
        })
    })

    it("navLinkTentang", () => {
        render(
        <MemoryRouter>
            <Navbar/>
        </MemoryRouter>);

        const navlink = screen.getByTestId(/tentang/i);

        expect(navlink).toBeInTheDocument();

        userEvent.click(navlink);

        waitFor(() => {
            expect(windoe.location.pathname).toBe("/pages/tentang");
        })
    })

    it("dropdown", async() => {
        render(<Navbar/>);

        const dropdownBut = screen.getByTestId(/profilgereja/i);
        expect(dropdownBut).toBeInTheDocument();

        await userEvent.click(dropdownBut);

        const dropdownModal = screen.getByTestId(/modalDropdown/i);

        expect(dropdownModal).toBeInTheDocument();

        await userEvent.click(document.body);

        expect(dropdownModal).not.toBeInTheDocument();
    })
    
    it("Button Login", () => {
        render(<Navbar/>);

        const buttonLogin = screen.getByText(/login/i);

        expect(buttonLogin).toBeInTheDocument();

        userEvent.click(buttonLogin);

        waitFor(() => {
            expect(window.location.pathname).toBe("/pages/login");
        })
    })
})

