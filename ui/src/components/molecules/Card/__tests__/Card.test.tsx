import React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "../Card";

describe("Card 컴포넌트", () => {
  test("children과 함께 렌더링", () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );

    expect(screen.getByText("Card content")).toBeInTheDocument();
    const card = screen.getByText("Card content").closest(".tooliv-card");
    expect(card?.querySelector(".tooliv-card__content")).toBeInTheDocument();
  });

  test("title과 함께 렌더링", () => {
    render(<Card title="Card Title">Content</Card>);

    const title = screen.getByText("Card Title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("tooliv-card__title");
    expect(title.tagName).toBe("H3");
  });

  test("커스텀 header와 함께 렌더링", () => {
    render(<Card header={<div>Custom Header</div>}>Content</Card>);

    expect(screen.getByText("Custom Header")).toBeInTheDocument();
    expect(screen.getByText("Custom Header").parentElement).toHaveClass(
      "tooliv-card__header"
    );
  });

  test("footer와 함께 렌더링", () => {
    render(<Card footer={<button>Save</button>}>Content</Card>);

    const footerButton = screen.getByRole("button", { name: /save/i });
    expect(footerButton).toBeInTheDocument();
    expect(footerButton.parentElement).toHaveClass("tooliv-card__footer");
  });

  test("title과 header가 모두 있을 때 header가 우선순위", () => {
    render(
      <Card title="Title" header={<div>Header</div>}>
        Content
      </Card>
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.queryByText("Title")).not.toBeInTheDocument();
  });

  test("커스텀 className 적용", () => {
    render(<Card className="custom-card">Content</Card>);

    const card = screen.getByText("Content").closest(".tooliv-card");
    expect(card).toHaveClass("custom-card");
  });

  test("title이나 header가 없을 때 header 렌더링 안함", () => {
    render(<Card>Content</Card>);

    const card = screen.getByText("Content").closest(".tooliv-card");
    expect(card).toBeInTheDocument();
    expect(card?.querySelector(".tooliv-card__header")).not.toBeInTheDocument();
  });

  test("footer가 없을 때 footer 렌더링 안함", () => {
    render(<Card>Content</Card>);

    const card = screen.getByText("Content").closest(".tooliv-card");
    expect(card?.querySelector(".tooliv-card__footer")).not.toBeInTheDocument();
  });

  test("복잡한 콘텐츠 구조 렌더링", () => {
    render(
      <Card title="User Profile" footer={<button>Edit</button>}>
        <div>
          <h4>John Doe</h4>
          <p>Software Developer</p>
        </div>
      </Card>
    );

    expect(screen.getByText("User Profile")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Software Developer")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
  });

  test("올바른 CSS 클래스 구조", () => {
    render(
      <Card title="Test" className="test-class">
        Content
      </Card>
    );

    const card = screen.getByText("Content").closest(".tooliv-card");
    expect(card).toHaveClass("tooliv-card", "test-class");

    const header = card?.querySelector(".tooliv-card__header");
    expect(header).toHaveClass("tooliv-card__header");

    const content = card?.querySelector(".tooliv-card__content");
    expect(content).toHaveClass("tooliv-card__content");
  });
});
