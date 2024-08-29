import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";

const RegisterModal = ({
  isOpen,
  setIsOpen,
  toggleSignupModal,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSignupModal: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    balance: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    toggleSignupModal();
    location.reload()
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay className="fixed bg-black bg-opacity-30 transition-opacity duration-300" />
      <DialogContent
        className="w-1/2 fixed flex flex-col items-center justify-center transition-opacity duration-300"
        aria-label="Signup Modal"
      >
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="w-full space-y-4 flex flex-col gap-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <RadioGroup
              onValueChange={(value) =>
                setFormData({ ...formData, gender: value })
              }
              value={formData.gender}
              className="flex space-x-4"
            >
              <RadioGroupItem value="Male" id="male" />
              <Label htmlFor="male">Male</Label>
              <RadioGroupItem value="Female" id="female" />
              <Label htmlFor="female">Female</Label>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              maxLength={6}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Register</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
