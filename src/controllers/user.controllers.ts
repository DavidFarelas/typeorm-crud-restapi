import { User } from "./../entities/User";
import { Request, Response } from "express";

export async function createUser(req: Request, res: Response) {
  try {
    const { firstname, lastname } = req.body;

    //throw new Error("Ocurrió un error");

    const user = new User();

    user.firstname = firstname;
    user.lastname = lastname;

    await user.save();

    res.json(user);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    //throw new Error("Ocurrió un error");
    const users = await User.find();

    return res.json(users);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
}

export async function updateUser(req: Request, res: Response) {
  const { firstname, lastname } = req.body;
  const { id } = req.params;
  const user = await User.findOneBy({ id: parseInt(req.params.id) });

  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  await User.update({ id: parseInt(id) }, { firstname, lastname });

  res.sendStatus(204);
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const result = await User.delete({ id: parseInt(id) });

    console.log(result);

    if (result.affected === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const user = await User.findOneBy({ id: parseInt(req.params.id) });

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
