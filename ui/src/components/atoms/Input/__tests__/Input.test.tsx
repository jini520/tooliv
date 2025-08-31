import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../Input";

describe("Input 컴포넌트", () => {
  test("기본 props로 렌더링", () => {
    render(<Input />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("tooliv-input");
    expect(input).toHaveAttribute("type", "text");
  });

  test("커스텀 type으로 렌더링", () => {
    render(<Input type="email" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
  });

  test("placeholder로 렌더링", () => {
    render(<Input placeholder="Enter your name" />);

    const input = screen.getByPlaceholderText("Enter your name");
    expect(input).toBeInTheDocument();
  });

  test("label로 렌더링", () => {
    render(<Input label="Username" />);

    const label = screen.getByText("Username");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("tooliv-input__label");
  });

  test("value로 렌더링", () => {
    render(<Input value="John Doe" />);

    const input = screen.getByDisplayValue("John Doe");
    expect(input).toBeInTheDocument();
  });

  test("onChange 이벤트 처리", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Value" } });

    expect(handleChange).toHaveBeenCalledWith("New Value");
  });

  test("비활성화 상태 렌더링", () => {
    render(<Input disabled />);

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  test("에러 메시지 렌더링", () => {
    render(<Input error="This field is required" />);

    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("tooliv-input__error");
  });

  test("커스텀 className 적용", () => {
    render(<Input className="custom-input" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-input");
  });

  test("다양한 input type 렌더링", () => {
    const { rerender } = render(<Input type="password" />);

    let input = screen.getByDisplayValue("");
    expect(input).toHaveAttribute("type", "password");

    rerender(<Input type="number" />);
    input = screen.getByDisplayValue("");
    expect(input).toHaveAttribute("type", "number");
  });

  test("label과 input의 올바른 구조 렌더링", () => {
    render(<Input label="Email" placeholder="Enter email" />);

    const label = screen.getByText("Email");
    const input = screen.getByPlaceholderText("Enter email");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(label).toHaveClass("tooliv-input__label");
    expect(input).toHaveClass("tooliv-input");
  });
});
