import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {render, screen, waitFor} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BeritaCard from "@/components/Fragments/BeritaCard";

describe("Berita Card", () => {
    const mockData ={
        id:1,
        title:"Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya",
        desc: "Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan.",
        imgPath:"/img/hero.png"
    }
    it("PathNameCard",() => {
        render(
            <MemoryRouter>
                <BeritaCard data={mockData}/>
            </MemoryRouter>
        );
        
        const link = screen.getByTestId("pathnameTest")
        
        userEvent.click(link);
        
        waitFor(() => {
            expect(window.location.pathname).toBe("/pages/berita/1");
        })
    })
    
    it("Image exist?", () => {
        render(<BeritaCard data={mockData}/>)
        const imgCard = screen.getByTestId("imgTest");
        expect(imgCard).toBeInTheDocument();
    })
    
    it("title exist?", () => {
        render(<BeritaCard data={mockData}/>)
        const cardTitle = screen.getByTestId("titleTest");
        expect(cardTitle).toBeInTheDocument();
    })

    it("desc exit?", () => {
        render(<BeritaCard data={mockData}/>)
        const cardDesc = screen.getByTestId("descTest");
        expect(cardDesc).toBeInTheDocument();
    })
})