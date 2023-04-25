<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Form\ReservationType;
use App\Repository\HoraireRepository;
use App\Repository\ParametresRepository;
use App\Repository\ReservationRepository;
use DateTime;
use Doctrine\Common\Collections\Expr\Value;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/reservation')]
class ReservationController extends AbstractController
{
    #[Route('/', name: 'app_reservation_index', methods: ['GET'])]
    public function index(ReservationRepository $reservationRepository): Response
    {
        return $this->render('reservation/index.html.twig', [
            'reservations' => $reservationRepository->findAll(),
        ]);
    }

    // récupère les réservations déjà effectuées à cette date et heure choisie (+1heure)
    // et calcul le nombre de couvert pendant cette période
    #[Route('/getdata/{date}/{startTime}/{endTime}', name: 'app_reservation_getdata')]
    public function getDataAction(ParametresRepository $parametresRepository, ReservationRepository $reservationRepository, DateTime $date, 
                        DateTime $startTime, DateTime $endTime): JsonResponse
    {
        $parametres = $parametresRepository->findAll();
        $nbConviveMax = $parametres[0]->getNbConviveSeuil();

        $reservations = $reservationRepository->findByDateAndTime($date, $startTime, $endTime);
        $nbCouvert = 0;
        
        foreach($reservations as $reservation)
        {
            $nbCouvert += $reservation->getNbCouvert();
        }
        
        return new JsonResponse($nbConviveMax - $nbCouvert);
    }
    
    #[Route('/new', name: 'app_reservation_new', methods: ['GET', 'POST'])]
    public function new(Request $request, ReservationRepository $reservationRepository, HoraireRepository $horaireRepository): Response
    {
        $userId = $this->getUser();
                
        $reservation = new Reservation();
        if ($userId) {
            $reservation->setNom($userId->getNom());
            $reservation->setNbCouvert($userId->getNbConvive());
            $reservation->setAllergie($userId->getAllergie());
        }
        
        $form = $this->createForm(ReservationType::class, $reservation);
        
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // cya: code à rajouter avant de sauvegarder la réservation notamment par rapport au jour de la résa. (lundi,..) 
            // et les horaires d'ouverture

            $reservationRepository->save($reservation, true);

            return $this->redirectToRoute('app_reservation_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('reservation/new.html.twig', [
            'reservation' => $reservation,
            'form' => $form,
            'horaires' => $horaireRepository->findAll(),
        ]);
    }

    #[Route('/{id}', name: 'app_reservation_show', methods: ['GET'])]
    public function show(Reservation $reservation): Response
    {
        return $this->render('reservation/show.html.twig', [
            'reservation' => $reservation,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_reservation_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Reservation $reservation, ReservationRepository $reservationRepository): Response
    {
        $form = $this->createForm(ReservationType::class, $reservation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $reservationRepository->save($reservation, true);

            return $this->redirectToRoute('app_reservation_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('reservation/edit.html.twig', [
            'reservation' => $reservation,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_reservation_delete', methods: ['POST'])]
    public function delete(Request $request, Reservation $reservation, ReservationRepository $reservationRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$reservation->getId(), $request->request->get('_token'))) {
            $reservationRepository->remove($reservation, true);
        }

        return $this->redirectToRoute('app_reservation_index', [], Response::HTTP_SEE_OTHER);
    }
}
