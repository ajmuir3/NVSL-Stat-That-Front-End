import { IonSelect, IonSelectOption } from '@ionic/react';
import './Dropdown.css';

function Dropdown() {
  return (
    <div className='dropdowns'>
        <IonSelect label="Select a Year" labelPlacement="floating" className='dropdown' value="year">
            <IonSelectOption value="All-Years">All Years</IonSelectOption>
            <IonSelectOption value="2024">2024</IonSelectOption>
            <IonSelectOption value="2023">2023</IonSelectOption>
            <IonSelectOption value="2022">2022</IonSelectOption>
            <IonSelectOption value="2021">2021</IonSelectOption>
        </IonSelect>
    
        <IonSelect label="Select a Team" labelPlacement="floating" className='dropdown' value="name">
            <IonSelectOption value="All-Teams">All Teams</IonSelectOption>
            <IonSelectOption value="Annandale">Annandale</IonSelectOption>
            <IonSelectOption value="Arlington-Forest">Arlington Forest</IonSelectOption>
            <IonSelectOption value="Brandywine">Brandywine</IonSelectOption>
            <IonSelectOption value="Brookfield">Brookfield</IonSelectOption>
            <IonSelectOption value="Broyhill-Crest">Broyhill Crest</IonSelectOption>
            <IonSelectOption value="Burke-Station">Burke Station</IonSelectOption>
            <IonSelectOption value="Camelot">Camelot</IonSelectOption>
            <IonSelectOption value="Canterbury-Woods">Canterbury Woods</IonSelectOption>
            <IonSelectOption value="Cardinal-Hill">Cardinal Hill</IonSelectOption>
            <IonSelectOption value="Chesterbrook">Chesterbrook</IonSelectOption>
            <IonSelectOption value="Commonwealth">Commonwealth</IonSelectOption>
            <IonSelectOption value="Cottontail">Cottontail</IonSelectOption>
            <IonSelectOption value="Country-Club-Hills">Country Club Hills</IonSelectOption>
            <IonSelectOption value="Crosspointe">Crosspointe</IonSelectOption>
            <IonSelectOption value="Daventry">Daventry</IonSelectOption>
            <IonSelectOption value="Dominion-Hills">Dominion Hills</IonSelectOption>
            <IonSelectOption value="Donaldson-Run">Donaldson Run</IonSelectOption>
            <IonSelectOption value="Dowden-Terrace">Dowden Terrace</IonSelectOption>
            <IonSelectOption value="Dunn-Loring">Dunn Loring</IonSelectOption>
            <IonSelectOption value="Edsall-Park">Edsall Park</IonSelectOption>
            <IonSelectOption value="Fair-Oaks">Fair Oaks</IonSelectOption>
            <IonSelectOption value="Fairfax">Fairfax</IonSelectOption>
            <IonSelectOption value="Fairfax-Club-Estates">Fairfax Club Estates</IonSelectOption>
            <IonSelectOption value="Fairfax-Station">Fairfax Station</IonSelectOption>
            <IonSelectOption value="Forest-Hollow">Forest Hollow</IonSelectOption>
            <IonSelectOption value="Fox-Hunt">Fox Hunt</IonSelectOption>
            <IonSelectOption value="Fox-Mill-Estates">Fox Mill Estates</IonSelectOption>
            <IonSelectOption value="Fox-Mill-Woods">Fox Mill Woods</IonSelectOption>
            <IonSelectOption value="Great-Falls">Great Falls</IonSelectOption>
            <IonSelectOption value="Greenbriar">Greenbriar</IonSelectOption>
            <IonSelectOption value="Hollin-Hills">Hollin Hills</IonSelectOption>
            <IonSelectOption value="Hunter-Mill">Hunter Mill</IonSelectOption>
            <IonSelectOption value="Hunt-Valley">Hunt Valley</IonSelectOption>
            <IonSelectOption value="Kent-Gardens">Kent Gardens</IonSelectOption>
            <IonSelectOption value="Kings-Ridge">Kings Ridge</IonSelectOption>
            <IonSelectOption value="Langley">Langley</IonSelectOption>
            <IonSelectOption value="Lakevale-Estates">Lakevale Estates</IonSelectOption>
            <IonSelectOption value="Little-Hunting-Park">Little Hunting Park</IonSelectOption>
            <IonSelectOption value="Long-Branch">Long Branch</IonSelectOption>
            <IonSelectOption value="Mantua">Mantua</IonSelectOption>
            <IonSelectOption value="Mclean">Mclean</IonSelectOption>
            <IonSelectOption value="Mosby-Woods">Mosby Woods</IonSelectOption>
            <IonSelectOption value="Mount-Vernon-Park">Mount Vernon Park</IonSelectOption>
            <IonSelectOption value="Newport">Newport</IonSelectOption>
            <IonSelectOption value="Oakton">Oakton</IonSelectOption>
            <IonSelectOption value="Old-Keene-Mill">Old Keene Mill</IonSelectOption>
            <IonSelectOption value="Orange-Hunt">Orange Hunt</IonSelectOption>
            <IonSelectOption value="Parliament">Parliament</IonSelectOption>
            <IonSelectOption value="Pinecrest">Pinecrest</IonSelectOption>
            <IonSelectOption value="Poplar-Tree">Poplar Tree</IonSelectOption>
            <IonSelectOption value="Ravensworth-Farm">Ravensworth Farm</IonSelectOption>
            <IonSelectOption value="Riverside-Gardens">Riverside Gardens</IonSelectOption>
            <IonSelectOption value="Rolling-Forest">Rolling Forest</IonSelectOption>
            <IonSelectOption value="Rolling-Hills">Rolling Hills</IonSelectOption>
            <IonSelectOption value="Rolling-Valley">Rolling Valley</IonSelectOption>
            <IonSelectOption value="Rutherford">Rutherford</IonSelectOption>
            <IonSelectOption value="Shouse-Village">Shouse Village</IonSelectOption>
            <IonSelectOption value="Sideburn-Run">Sideburn Run</IonSelectOption>
            <IonSelectOption value="Sleepy-Hollow-B-&-R">Sleepy Hollow B & R</IonSelectOption>
            <IonSelectOption value="Sleepy-Hollow-Rec">Sleepy Hollow Rec</IonSelectOption>
            <IonSelectOption value="Somerset-Olde-Creek">Somerset Olde Creek</IonSelectOption>
            <IonSelectOption value="South-Run">South Run</IonSelectOption>
            <IonSelectOption value="Springboard">Springboard</IonSelectOption>
            <IonSelectOption value="Springfield">Springfield</IonSelectOption>
            <IonSelectOption value="Stratford">Stratford</IonSelectOption>
            <IonSelectOption value="Sully-Station">Sully Station</IonSelectOption>
            <IonSelectOption value="Sully-Station-II">Sully Station II</IonSelectOption>
            <IonSelectOption value="Truro">Truro</IonSelectOption>
            <IonSelectOption value="Tuckahoe">Tuckahoe</IonSelectOption>
            <IonSelectOption value="Vienna-Aquatic">Vienna Aquatic</IonSelectOption>
            <IonSelectOption value="Vienna-Woods">Vienna Woods</IonSelectOption>
            <IonSelectOption value="Villa-Aquatic">Villa Aquatic</IonSelectOption>
            <IonSelectOption value="Village-West">Village West</IonSelectOption>
            <IonSelectOption value="Virginia-Hills">Virginia Hills</IonSelectOption>
            <IonSelectOption value="Virginia-Run">Virginia Run</IonSelectOption>
            <IonSelectOption value="Wakefield-Chapel">Wakefield Chapel</IonSelectOption>
            <IonSelectOption value="Walden-Glen">Walden Glen</IonSelectOption>
            <IonSelectOption value="Waynewood">Waynewood</IonSelectOption>
            <IonSelectOption value="Woodley">Woodley</IonSelectOption>
        </IonSelect>
    
        <IonSelect label="Select a Division" labelPlacement="floating" className='dropdown' value="division">
            <IonSelectOption value="All-Divisions">All Divisions</IonSelectOption>
            <IonSelectOption value="1">1</IonSelectOption>
            <IonSelectOption value="2">2</IonSelectOption>
            <IonSelectOption value="3">3</IonSelectOption>
            <IonSelectOption value="4">4</IonSelectOption>
            <IonSelectOption value="5">5</IonSelectOption>
            <IonSelectOption value="6">6</IonSelectOption>
            <IonSelectOption value="7">7</IonSelectOption>
            <IonSelectOption value="8">8</IonSelectOption>
            <IonSelectOption value="9">9</IonSelectOption>
            <IonSelectOption value="10">10</IonSelectOption>
            <IonSelectOption value="11">11</IonSelectOption>
            <IonSelectOption value="12">12</IonSelectOption>
            <IonSelectOption value="13">13</IonSelectOption>
            <IonSelectOption value="14">14</IonSelectOption>
            <IonSelectOption value="15">15</IonSelectOption>
            <IonSelectOption value="16">16</IonSelectOption>
            <IonSelectOption value="17">17</IonSelectOption>
        </IonSelect>
    </div>
  );
}
export default Dropdown;