<?php

namespace App\Controller;

use App\Entity\Horaire;
use App\Form\HoraireType;
use App\Repository\HoraireRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/horaire')]
class HoraireController extends AbstractController
{
    #[Route('/', name: 'app_horaire_index', methods: ['GET'])]
    public function index(HoraireRepository $horaireRepository): Response
    {
        return $this->render('horaire/index.html.twig', [
            'horaires' => $horaireRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_horaire_new', methods: ['GET', 'POST'])]
    public function new(Request $request, HoraireRepository $horaireRepository): Response
    {
        $horaire = new Horaire();
        $form = $this->createForm(HoraireType::class, $horaire);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $horaireRepository->save($horaire, true);

            return $this->redirectToRoute('app_horaire_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('horaire/new.html.twig', [
            'horaire' => $horaire,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_horaire_show', methods: ['GET'])]
    public function show(Horaire $horaire): Response
    {
        return $this->render('horaire/show.html.twig', [
            'horaire' => $horaire,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_horaire_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Horaire $horaire, HoraireRepository $horaireRepository): Response
    {
        $form = $this->createForm(HoraireType::class, $horaire);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $horaireRepository->save($horaire, true);

            return $this->redirectToRoute('app_horaire_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('horaire/edit.html.twig', [
            'horaire' => $horaire,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_horaire_delete', methods: ['POST'])]
    public function delete(Request $request, Horaire $horaire, HoraireRepository $horaireRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$horaire->getId(), $request->request->get('_token'))) {
            $horaireRepository->remove($horaire, true);
        }

        return $this->redirectToRoute('app_horaire_index', [], Response::HTTP_SEE_OTHER);
    }
}
