import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Section from '../components/ui/Section';
import { FileText, CreditCard, TrendingUp, AlertCircle } from 'lucide-react';

const AccountPage = () => {
  const [isLoading] = useState(true);

  return (
    <>
      <Helmet>
        <title>Mon Compte | SCI BIBA IMMO INGENIERING</title>
        <meta name="description" content="Gérez vos informations financières et suivez vos transactions avec SCI BIBA IMMO." />
      </Helmet>

      <div className="pt-24">
        <Section className="py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-primary-800 mb-6">Mon Compte</h1>
            <p className="text-xl text-gray-600 mb-12">
              Consultez vos informations financières et gérez vos transactions.
            </p>

            {isLoading ? (
              <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            ) : (
              <div className="grid gap-8">
                <div className="card">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary-100 rounded-full">
                      <FileText className="h-6 w-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Factures
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    Aucune facture disponible pour le moment.
                  </p>
                </div>

                <div className="card">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary-100 rounded-full">
                      <CreditCard className="h-6 w-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Moyens de Paiement
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    Aucun moyen de paiement enregistré.
                  </p>
                </div>

                <div className="card">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary-100 rounded-full">
                      <TrendingUp className="h-6 w-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Historique des Transactions
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    Aucune transaction effectuée.
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                        Information Importante
                      </h3>
                      <p className="text-yellow-700">
                        Pour toute question concernant vos paiements ou vos factures, 
                        n'hésitez pas à contacter notre service comptabilité.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Section>
      </div>
    </>
  );
};

export default AccountPage;