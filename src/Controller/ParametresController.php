<?php

namespace App\Controller;

use App\Entity\Parametres;
use App\Form\ParametresType;
use App\Repository\ParametresRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Request;

#[Route('/parametres')]
class ParametresController extends AbstractController
{
    #[Route('/', name: 'app_parametres', methods: ['GET'])]
    public function index(ParametresRepository $parametreRepository): Response
    {
        return $this->render('parametres/index.html.twig', [
            'parametres' => $parametreRepository->findAll(),
        ]);
    }

    #[Route('/{id}/edit', name: 'app_parametres_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Parametres $parametre, ParametresRepository $parametreRepository): Response
    {
        $form = $this->createForm(ParametresType::class, $parametre);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $parametreRepository->save($parametre, true);

            return $this->redirectToRoute('app_parametres', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('parametres/edit.html.twig', [
            'parametre' => $parametre,
            'form' => $form,
        ]);
    }
}