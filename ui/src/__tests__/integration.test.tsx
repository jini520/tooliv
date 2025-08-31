import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button, Input, Card } from "../index";

describe("UI 컴포넌트 통합 테스트", () => {
  test("Button과 Input 컴포넌트가 포함된 폼 렌더링", () => {
    const handleSubmit = jest.fn();

    render(
      <Card title="Login Form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Input label="Username" placeholder="Enter username" />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
          />
          <Button type="submit">Login</Button>
        </form>
      </Card>
    );

    expect(screen.getByText("Login Form")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("폼 상호작용 올바르게 처리", () => {
    const handleSubmit = jest.fn();
    const handleUsernameChange = jest.fn();
    const handlePasswordChange = jest.fn();

    render(
      <Card title="Registration Form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Input
            label="Username"
            placeholder="Enter username"
            onChange={handleUsernameChange}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            onChange={handlePasswordChange}
          />
          <Button type="submit">Register</Button>
        </form>
      </Card>
    );

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /register/i });

    fireEvent.change(usernameInput, { target: { value: "john_doe" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(handleUsernameChange).toHaveBeenCalledWith("john_doe");
    expect(handlePasswordChange).toHaveBeenCalledWith("password123");
    expect(handleSubmit).toHaveBeenCalled();
  });

  test("여러 버튼이 포함된 카드 렌더링", () => {
    const handleSave = jest.fn();
    const handleCancel = jest.fn();

    render(
      <Card
        title="User Settings"
        footer={
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        }
      >
        <Input label="Display Name" placeholder="Enter display name" />
        <Input label="Email" type="email" placeholder="Enter email" />
      </Card>
    );

    expect(screen.getByText("User Settings")).toBeInTheDocument();
    expect(screen.getByLabelText("Display Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    const saveButton = screen.getByRole("button", { name: /save/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    expect(saveButton).toHaveClass("tooliv-button--primary");
    expect(cancelButton).toHaveClass("tooliv-button--outline");

    fireEvent.click(saveButton);
    fireEvent.click(cancelButton);

    expect(handleSave).toHaveBeenCalled();
    expect(handleCancel).toHaveBeenCalled();
  });

  test("폼에서 에러 상태 처리", () => {
    render(
      <Card title="Error Form">
        <Input
          label="Username"
          error="Username is required"
          placeholder="Enter username"
        />
        <Input
          label="Email"
          error="Invalid email format"
          placeholder="Enter email"
        />
        <Button disabled>Submit</Button>
      </Card>
    );

    expect(screen.getByText("Username is required")).toBeInTheDocument();
    expect(screen.getByText("Invalid email format")).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });
});
